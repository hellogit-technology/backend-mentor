import { Application } from 'express';

const routeV1 = (app: Application) => {
  app.use('/');
};

export default routeV1;
