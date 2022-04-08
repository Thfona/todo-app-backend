import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import { appRoutesV1 } from './routes';
import { EnvironmentUtil } from './utils/environment.util';
import { ErrorMessageUtil } from './utils/error-message.util';
import { ErrorResponseUtil } from './utils/error-response.util';
import { ErrorInterface } from './interfaces/error.interface';
import { messages } from './constants/messages.constant';

class App {
  public express: Application;

  public constructor() {
    this.express = express();

    this.initializeMiddlewares();
    this.initializeDatabaseConnection();
    this.initializeRoutes();
    this.initializeErrorHandler();
  }

  private initializeMiddlewares(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.use(cookieParser());

    const speedLimiter = slowDown({
      windowMs: 15 * 60 * 1000,
      delayAfter: 500,
      delayMs: 10
    });

    this.express.use(speedLimiter);

    const rateLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 1000
    });

    this.express.use(rateLimiter);
  }

  private initializeDatabaseConnection(): void {
    this.connectDatabase();

    mongoose.connection.on('disconnected', this.connectDatabase);
  }

  private initializeRoutes(): void {
    this.express.use('/api/v1', appRoutesV1);
  }

  private initializeErrorHandler(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.express.use((error: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
      const isDev = !EnvironmentUtil.isProduction();
      const errorHandlerCodeSuffix = 'Z';

      if (!error.status) {
        error.status = 500;
      }

      if (isDev) {
        console.log('\nError:', error);
      }

      if (error.redirect) {
        const status = 404;

        const message = ErrorMessageUtil.parseErrorMessage(error.message) || messages.notFound;

        const errorResponse = ErrorResponseUtil.getErrorResponse(
          errorHandlerCodeSuffix,
          status,
          message,
          error.redirect
        );

        res.status(status).json(errorResponse);
      } else {
        const status = error.status;

        const message = ErrorMessageUtil.parseErrorMessage(error.message) || messages.serverError;

        const errorResponse = ErrorResponseUtil.getErrorResponse(errorHandlerCodeSuffix, status, message);

        res.status(error.status).json(errorResponse);
      }
    });
  }

  private connectDatabase(): void {
    const db = EnvironmentUtil.databaseHost();

    mongoose
      .connect(db)
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch((error: any) => {
        console.error(`Error connecting to database: ${error}`);

        return process.exit(1);
      });
  }
}

export const app = new App().express;
