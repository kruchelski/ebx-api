import express from 'express';
import { mainRouter } from './src/routes/index.js';
import { defaultController } from './src/controllers/index.js';

const init = () => {
  const app = express();
  app.use(express.json());

  app.use('/', mainRouter);

  app.use('*', defaultController.routeNotFound);

  app.listen(3000, () => {
    console.log('app running on port 3000');
  });
};

init();
