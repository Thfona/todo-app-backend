import { ErrorResponseInterface } from '../interfaces/error-response.interface';

export class ErrorResponseUtil {
  public static getErrorResponse(
    codeSuffix: string,
    status: number,
    message: string,
    redirect?: boolean
  ): ErrorResponseInterface {
    const statusCode = status.toString() + codeSuffix;

    return redirect == null
      ? {
          error: {
            status: status,
            code: statusCode,
            message: message
          }
        }
      : {
          error: {
            status: status,
            code: statusCode,
            message: message,
            redirect: redirect
          }
        };
  }
}
