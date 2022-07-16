import { Application } from "express";
import utilRouter from './util'
import adminRouter from './admin'
import clubRouter from './club'
import siteRouter from './site'
import errorRouter from './error'
import authRouter from './auth'

const route = (app: Application) => {
  
    app.use('/auth', authRouter)

    app.use('/util', utilRouter);

    app.use('/admin', adminRouter);

    app.use('/club', clubRouter)

    app.use('/', siteRouter);

    app.use('/', errorRouter);

}

export default route