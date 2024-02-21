import express from 'express';
import { Todo } from '../data/todo';
import { TodoCreationSchema, TodoUpdateSchema } from '../data/todo-schemas';
import { validateSchema } from '../middlewares/schema-validator';
import { Store } from '../services/store';

export const getTodoRouter = () => {
  const router = express.Router();

  router.get('/', (_req, resp) => {
    const items = Store.todo.getAll();
    resp.status(200).json(items);
  });

  router.get('/:id', (req, resp) => {
    const items = Store.todo.getById(req.params.id);
    resp.status(200).json(items);
  });

  router.post(
    '/',
    validateSchema({
      body: TodoCreationSchema,
    }),
    (req, resp) => {
      const item = req.body as Todo;
      item.completed = false;
      const entity = Store.todo.create(item);
      resp.status(200).json(entity);
    },
  );

  router.put(
    '/:id',
    validateSchema({
      body: TodoUpdateSchema,
    }),
    (req, resp) => {
      const id = req.params.id as string;
      const item = req.body as Todo;
      const entity = Store.todo.update(id, item);
      resp.status(202).json(entity);
    },
  );

  router.delete('/:id', (req, resp) => {
    const id = req.params.id as string;
    Store.todo.delete(id);
    resp.sendStatus(202);
  });

  return router;
};
