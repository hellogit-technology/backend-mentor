import {Request, Response, NextFunction} from 'express'

class AdminControllers {

    // [GET] /admin
    adminRender(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).render('admin/index', {layout: 'layouts/admin/index', title: 'Admin'})
        } catch (error) {
            res.status(500).render('status/500', { layout: false, error });
        }
    }
}

export default new AdminControllers