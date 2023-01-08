import express from 'express';
import { mainController } from '../controllers/index.js';
import { routesUtils } from '../utils/index.js';

const mainRouter = express.Router();

const { health, reset, addAccount, getAllAccounts } = mainController;

const ROUTES = [
  { path: '/health', method: 'get', controller: health },
  { path: '/reset', method: 'post', controller: reset },
  { path: '/add', method: 'get', controller: addAccount },
  { path: '/list', method: 'get', controller: getAllAccounts },
];

routesUtils.registerRoutes(mainRouter, ROUTES);

export default mainRouter;
