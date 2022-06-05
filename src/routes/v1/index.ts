import { Application } from 'express';
import adminRouter from './admin';
import utilRouter from './util';
import leaderRouter from './leader';
import errorRouter from './error';

const route = (app: Application) => {
  app.use('/util', utilRouter);

  app.use('/club', leaderRouter);

  app.use('/', adminRouter);

  app.use('/', errorRouter);
};

export default route;
