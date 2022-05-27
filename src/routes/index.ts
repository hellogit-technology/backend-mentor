import { Application } from 'express';
import siteRouter from './v1/site';
import utilRouter from './v1/util';

const route = (app: Application) => {
  app.use('/', siteRouter);

  app.use('/util', utilRouter);

};

export default route;
