import {Request, Response, NextFunction} from 'express'

class AdminControllers {

    // [GET] /users
    userRender(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).render('admin/users/index', {
                layout: 'layouts/admin/index', 
                title: 'Users | Management',
                chosen: 'user'
            })
        } catch (error) {
            res.status(500).render('status/500', { layout: false, error });
        }
    }
}

export default new AdminControllers