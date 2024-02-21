import { TodoRepository } from './repositories/todo-repository';

declare global {
  namespace Express {
    interface Request {
      todoStore: TodoRepository;
    }
  }
}
