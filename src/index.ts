import express from 'express';
import { Todo } from './data/todo';
import { basicAuth } from './middlewares/auth-middleware';
import {
  errorHandler,
  installGlobalErrorHandlers,
} from './middlewares/error-handler-middleware';
import { todoStore } from './middlewares/todo-middleware';

const run = async () => {
  const app = express();
  app.use(express.json());
  app.use(basicAuth('test-user', '1234'));
  app.use(todoStore);

  app.get('/', (req, resp) => {
    const items = req.todoStore.getAll();
    resp.status(200).json(items);
  });

  app.get('/:id', (req, resp) => {
    const items = req.todoStore.getById(req.params.id);
    resp.status(200).json(items);
  });

  app.post('/', (req, resp) => {
    const item = req.body as Todo;
    item.completed = false;
    const entity = req.todoStore.create(item);
    resp.status(200).json(entity);
  });

  app.put('/:id', (req, resp) => {
    const id = req.params.id as string;
    const item = req.body as Todo;
    const entity = req.todoStore.update(id, item);
    if (new Date().getTime()) {
      throw new Error('Fake error here');
    }
    resp.status(202).json(entity);
  });

  app.delete('/:id', (req, resp) => {
    const id = req.params.id as string;
    req.todoStore.delete(id);
    resp.sendStatus(202);
  });

  app.use(errorHandler);
  app.listen(8080, () => console.log(`Application started`));
};

installGlobalErrorHandlers();
run()
  .then(() => true)
  .catch((e) => console.error(e));
