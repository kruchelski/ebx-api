import express from 'express';
import { mainController } from '../controllers/index.js';
import { routesUtils } from '../utils/index.js';

const mainRouter = express.Router();

const { checkHealth, listAccounts, resetAccounts, getBalance, processAccountEvent } = mainController;

const ROUTES = [
  { path: '/health', method: 'get', controller: checkHealth },
  { path: '/accounts', method: 'get', controller: listAccounts },
  { path: '/reset', method: 'post', controller: resetAccounts },
  { path: '/balance', method: 'get', controller: getBalance },
  { path: '/event', method: 'post', controller: processAccountEvent },
];

routesUtils.registerRoutes(mainRouter, ROUTES);

export default mainRouter;
export { ROUTES as mainRoutes };
