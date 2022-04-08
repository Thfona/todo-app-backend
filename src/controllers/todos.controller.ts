import { Request, Response, NextFunction } from 'express';
import { TodoInterface } from '../interfaces/todo.interface';
import { TodoResponseInterface } from '../interfaces/todo-response.interface';
import { ErrorResponseUtil } from '../utils/error-response.util';
import { ValidatorUtil } from '../utils/validator.util';
import { todoModel } from '../models/todo.model';
import { messages } from '../constants/messages.constant';
import { TodoResponseUtil } from '../utils/todo-response.util';

export class TodosController {
  public static async getAllV1(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<TodoResponseInterface> | undefined> {
    try {
      const todos = await todoModel.find();

      const todosResponse: TodoResponseInterface[] = todos.map((todo) => {
        return TodoResponseUtil.parseTodoResponse(todo);
      });

      return res.status(200).json(todosResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async getByIdV1(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<TodoResponseInterface> | undefined> {
    try {
      const todo = await todoModel.findOne({ _id: req.params.id });

      // Error: Invalid todo
      if (!todo) {
        const status = 404;

        const errorResponse = ErrorResponseUtil.getErrorResponse('A', status, messages.notFound);

        return res.status(status).json(errorResponse);
      }

      const todoResponse: TodoResponseInterface = TodoResponseUtil.parseTodoResponse(todo);

      // Success: Todo data is returned
      return res.status(200).json(todoResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async createV1(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<TodoResponseInterface> | undefined> {
    try {
      const { error, parsedErrorMessage } = ValidatorUtil.validate('todo', req.body);

      // Error: Request body validation
      if (error) {
        const status = 400;

        const errorResponse = ErrorResponseUtil.getErrorResponse('A', status, parsedErrorMessage);

        return res.status(status).json(errorResponse);
      }

      const newTodoInfo: TodoInterface = {
        title: req.body.title,
        description: req.body.description
      };

      const newTodo = new todoModel({
        ...newTodoInfo
      });

      const createdTodo = await newTodo.save();

      const todoResponse: TodoResponseInterface = TodoResponseUtil.parseTodoResponse(createdTodo);

      // Success: Returns todo created
      return res.status(201).json(todoResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async updateV1(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<TodoResponseInterface> | undefined> {
    try {
      const todo = await todoModel.findOne({ _id: req.params.id });

      // Error: Invalid todo
      if (!todo) {
        const status = 404;

        const errorResponse = ErrorResponseUtil.getErrorResponse('A', status, messages.notFound);

        return res.status(status).json(errorResponse);
      }

      const { error, parsedErrorMessage } = ValidatorUtil.validate('todo', req.body);

      // Error: Request body validation
      if (error) {
        const status = 400;

        const errorResponse = ErrorResponseUtil.getErrorResponse('A', status, parsedErrorMessage);

        return res.status(status).json(errorResponse);
      }

      const newTodoInfo: TodoInterface = {
        title: req.body.title,
        description: req.body.description
      };

      await todoModel.updateOne({ _id: req.params.id }, newTodoInfo);

      const todoResponse: TodoResponseInterface = {
        id: todo._id,
        ...newTodoInfo
      };

      // Success: Returns todo updated
      return res.status(201).json(todoResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async deleteV1(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const todo = await todoModel.findOne({ _id: req.params.id });

      // Error: Invalid todo
      if (!todo) {
        const status = 404;

        const errorResponse = ErrorResponseUtil.getErrorResponse('A', status, messages.notFound);

        return res.status(status).json(errorResponse);
      }

      await todoModel.deleteOne({ _id: req.params.id });

      // Success: Returns no content
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
