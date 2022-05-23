import {Request, Response, NextFunction} from 'express'

class AccountControllers {

    // [GET] /users
    userRender(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).render('admin/account/index', {
                layout: 'layouts/admin/index', 
                title: 'Accounts | Management',
                chosen: 'account'
            })
        } catch (error) {
            res.status(500).render('status/500', { layout: false, error });
        }
    }
}

export default new AccountControllers