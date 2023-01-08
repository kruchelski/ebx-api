import express from 'express';
import { mainController } from '../controllers/index.js';
import { routesUtils } from '../utils/index.js';

const mainRouter = express.Router();

const { health } = mainController;

const ROUTES = [{ path: '/health', method: 'get', controller: health }];

routesUtils.registerRoutes(mainRouter, ROUTES);

export default mainRouter;
