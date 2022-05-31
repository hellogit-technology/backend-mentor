import { Application } from 'express';
import adminRouter from './v1/admin';
import utilRouter from './v1/util';
import leaderRouter from './v1/leader';
import errorRouter from './v1/error';

const route = (app: Application) => {
  app.use('/util', utilRouter);

  app.use('/', leaderRouter);

  app.use('/', adminRouter);

  app.use('/', errorRouter);
};

export default route;
