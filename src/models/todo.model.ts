import { model, Schema } from 'mongoose';
import { TodoDocumentInterface } from '../interfaces/todo.interface';

const todoSchema = new Schema<TodoDocumentInterface>({
  title: { type: String, required: true, min: 3 },
  description: { type: String, required: true, min: 6, max: 4096 }
});

export const todoModel = model<TodoDocumentInterface>('Todo', todoSchema);
