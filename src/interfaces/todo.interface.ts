import { Document } from 'mongoose';

export interface TodoInterface {
  title: string;
  description: string;
}

export interface TodoDocumentInterface extends TodoInterface, Document {}
