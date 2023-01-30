import { Application } from 'express';
import adminRouter from './admin';
import clubRouter from './club';
import siteRouter from './site';
import errorRouter from './error';
import authRouter from './auth';
import apiRouter from './api';
import { checkAuthLeader, checkAuthPDP, requiredAuth } from '../middleware/auth';

const route = (app: Application) => {
  app.use('/auth', authRouter);

  app.use('/api', requiredAuth, apiRouter);

  app.use('/admin', requiredAuth, checkAuthPDP, adminRouter);

  app.use('/club', requiredAuth, checkAuthLeader, clubRouter);

  app.use('/', siteRouter);

  app.use('/', errorRouter);
};

export default route;
