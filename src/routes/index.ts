import { Application } from 'express';
import adminRouter from './admin';
import clubRouter from './club';
import siteRouter from './site';
import errorRouter from './error';
import authRouter from './auth';
import apiRouter from './api';
import { checkAuthLeader, checkAuthPDP, isLogged } from '../middleware/auth';

const route = (app: Application) => {
  app.use('/auth', authRouter);

  app.use('/api', isLogged, apiRouter);

  app.use('/admin', isLogged, checkAuthPDP, adminRouter);

  app.use('/club', isLogged, checkAuthLeader, clubRouter);

  app.use('/', siteRouter);

  app.use('/', errorRouter);
};

export default route;
