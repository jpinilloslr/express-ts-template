import { NextFunction, Request, Response } from 'express';
import { TodoRepository } from '../repositories/todo-repository';

let _singletonStore: TodoRepository | null = null;

export const todoStore = (
  req: Request,
  _resp: Response,
  next: NextFunction,
) => {
  if (!_singletonStore) {
    console.log('Creating store');
    _singletonStore = new TodoRepository();
  }

  req.todoStore = _singletonStore;
  next();
};
