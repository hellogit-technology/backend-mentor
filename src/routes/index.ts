import { Application } from 'express';
import apiRouter from './api';
import auth from '../middleware/guard/auth';
import authControllers from '../app/controllers/AuthControllers';
import exceptionController from '../app/controllers/ExceptionController';
import siteControllers from '../app/controllers/SiteControllers';
import adminRenderControllers from '../app/controllers/admin/AdminRenderControllers';
import clubRenderControllers from '../app/controllers/club/ClubRenderControllers';

const route = (app: Application) => {
  app.use('/auth', authControllers.router);

  app.use('/api', auth.isLogged, apiRouter);

  app.use('/admin', auth.isLogged, auth.roleAccess(['Admin', 'PDPManager']), adminRenderControllers.router);

  app.use('/club', auth.isLogged, auth.roleAccess(['ClubManager']), clubRenderControllers.router);

  app.use('/', siteControllers.router);

  app.use('/', exceptionController.router);
};

export default route;
