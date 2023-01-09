import { jest } from '@jest/globals';
import express from 'express';
import { routesUtils } from '../../../src/utils';

describe('Tests the routes utils functions', () => {
  it('should add /test as a get route to the router', () => {
    const router = express.Router();
    const ROUTES = [{ path: '/test', method: 'get', controller: () => {} }];
    routesUtils.registerRoutes(router, ROUTES);

    const addedRoute = router.stack[0].route;
    const pathOfAddedRoute = addedRoute.path;
    const methodOfAddedroute = addedRoute.stack[0].method;
    expect(pathOfAddedRoute).toBe(ROUTES[0].path);
    expect(methodOfAddedroute).toBe(ROUTES[0].method);
  });

  it('should call the get method from router the same amount the times as there are get routes', () => {
    const router = express.Router();
    const spyFn = jest.spyOn(router, 'get');
    const ROUTES = [
      { path: '/test1', method: 'get', controller: () => {} },
      { path: '/test2', method: 'get', controller: () => {} },
    ];
    const numberOfGetRoutes = ROUTES.reduce((prev, curr) => {
      if (curr.method === 'get') return prev + 1;
      return prev;
    }, 0);

    routesUtils.registerRoutes(router, ROUTES);

    expect(spyFn).toBeCalledTimes(numberOfGetRoutes);
  });
});
