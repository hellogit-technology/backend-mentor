import {Request, Response, NextFunction} from 'express'

class LoginControllers {

    // [GET] /login
    loginRender(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).render('login/login', {layout: false})
        } catch (error) {
            res.status(500).render('status/500', {layout: false, error})
        }
    }
}

export default new LoginControllers