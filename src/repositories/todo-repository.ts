import crypto from 'crypto';
import { Todo } from '../data/todo';

export class TodoRepository {
  private _items: Todo[];

  public constructor() {
    this._items = [
      {
        id: 'item1',
        title: 'Item 1',
        description: 'This is item 1',
        completed: false,
      },
      {
        id: 'item2',
        title: 'Item 2',
        description: 'This is item 2',
        completed: false,
      },
      {
        id: 'item3',
        title: 'Item 3',
        description: 'This is item 3',
        completed: false,
      },
    ];
  }

  public getAll(): Todo[] {
    return this._items;
  }

  public getById(id: string): Todo | null {
    return this._items.find((x) => x.id === id) || null;
  }

  public create(item: Omit<Todo, 'id'>): Todo {
    const entity = {
      ...item,
      id: crypto.randomBytes(4).toString('hex'),
    };
    this._items.push(entity);
    return entity;
  }

  public update(id: string, item: Partial<Todo>): Todo | null {
    const entityIndex = this._items.findIndex((x) => x.id === id);
    if (entityIndex === -1) {
      return null;
    }
    const [persistedEntity] = this._items.splice(entityIndex, 1);
    const patchedEntity = {
      ...persistedEntity,
      ...item,
      id,
    };
    this._items.push(patchedEntity);
    return patchedEntity;
  }

  public delete(id: string): boolean {
    const entityIndex = this._items.findIndex((x) => x.id === id);
    if (entityIndex === -1) {
      return false;
    }
    this._items.splice(entityIndex, 1);
    return true;
  }
}
