import crypto from 'crypto';
import { Todo } from '../data/todo';

export type TodoSubscriber = (items: Todo[]) => void;

export class TodoRepository {
  private _items: Todo[];
  private _subscribers: TodoSubscriber[] = [];

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

  public subscribe(subscriber: TodoSubscriber): () => void {
    const subId = crypto.randomBytes(4).toString('hex');
    console.log(`Started subscription ${subId}`);
    this._subscribers.push(subscriber);
    subscriber(this._items);

    return () => {
      const index = this._subscribers.findIndex((x) => x === subscriber);
      if (index !== -1) {
        this._subscribers.splice(index, 1);
        console.log(`Closed subscription ${subId}`);
      }
    };
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
    this._notifyChange();
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
    this._notifyChange();
    return patchedEntity;
  }

  public delete(id: string): boolean {
    const entityIndex = this._items.findIndex((x) => x.id === id);
    if (entityIndex === -1) {
      return false;
    }
    this._items.splice(entityIndex, 1);
    this._notifyChange();
    return true;
  }

  private _notifyChange() {
    this._subscribers.forEach((x) => x(this._items));
  }
}
