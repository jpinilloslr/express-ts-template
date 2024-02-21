import express from 'express';
import { Todo } from '../data/todo';
import { TodoCreationSchema, TodoUpdateSchema } from '../data/todo-schemas';
import { validateSchema } from '../middlewares/schema-validator';

export const getTodoRouter = () => {
  const router = express.Router();

  router.get('/', (req, resp) => {
    const items = req.todoStore.getAll();
    resp.status(200).json(items);
  });

  router.get('/:id', (req, resp) => {
    const items = req.todoStore.getById(req.params.id);
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
      const entity = req.todoStore.create(item);
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
      const entity = req.todoStore.update(id, item);
      if (new Date().getTime()) {
        throw new Error('Fake error here');
      }
      resp.status(202).json(entity);
    },
  );

  router.delete('/:id', (req, resp) => {
    const id = req.params.id as string;
    req.todoStore.delete(id);
    resp.sendStatus(202);
  });

  return router;
};
