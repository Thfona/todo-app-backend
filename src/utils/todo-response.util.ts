import { TodoDocumentInterface } from '../interfaces/todo.interface';
import { TodoResponseInterface } from '../interfaces/todo-response.interface';

export class TodoResponseUtil {
  public static parseTodoResponse(todoDoc: TodoDocumentInterface): TodoResponseInterface {
    return {
      id: todoDoc._id,
      title: todoDoc.title,
      description: todoDoc.description
    };
  }
}
