import { Application } from 'express';
import routeV1 from './v1';

const route = (app: Application) => {
  app.use('/', routeV1);
};

export default route;
