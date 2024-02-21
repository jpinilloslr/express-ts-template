import { TodoRepository } from '../repositories/todo-repository';

let _todo: TodoRepository | null = null;

export class Store {
  public static get todo() {
    if (!_todo) {
      _todo = new TodoRepository();
    }
    return _todo;
  }
}
