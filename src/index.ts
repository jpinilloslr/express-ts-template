import express from 'express';
import expressWs from 'express-ws';
import { basicAuth } from './middlewares/auth-middleware';
import {
  errorHandler,
  installGlobalErrorHandlers,
} from './middlewares/error-handler-middleware';
import { getHealthRouter } from './routers/health-router';
import { getTodoRouter } from './routers/todo-router';
import { todoWs } from './routers/todo-ws';

const run = async () => {
  const app = express() as any as expressWs.Application;
  expressWs(app);

  app.use(express.json());

  app.use('/todo', basicAuth, getTodoRouter());
  app.use('/health', getHealthRouter());
  app.ws('/todo-ws', todoWs);

  app.use(errorHandler);
  app.listen(8080, () => console.log(`Application started`));
};

installGlobalErrorHandlers();
run()
  .then(() => true)
  .catch((e) => console.error(e));
