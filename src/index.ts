import express from 'express';
import { basicAuth } from './middlewares/auth-middleware';
import {
  errorHandler,
  installGlobalErrorHandlers,
} from './middlewares/error-handler-middleware';
import { todoStore } from './middlewares/todo-middleware';
import { getHealthRouter } from './routers/health-router';
import { getTodoRouter } from './routers/todo-router';

const run = async () => {
  const app = express();
  app.use(express.json());
  app.use(todoStore);

  app.use('/todo', basicAuth('user', '1234'), getTodoRouter());
  app.use('/health', getHealthRouter());

  app.use(errorHandler);
  app.listen(8080, () => console.log(`Application started`));
};

installGlobalErrorHandlers();
run()
  .then(() => true)
  .catch((e) => console.error(e));
