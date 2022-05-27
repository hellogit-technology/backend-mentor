import {Request, Response, NextFunction} from 'express'

// Configuration Session
declare module 'express-session' {

    interface Session {
        logged: boolean
    }
}

export const loginAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const status = req.session.logged

        if(status === true) {
            next()
        } else {
            res.redirect('/login')
        }

    } catch (error) {
        res.status(500).render('status/500', {layout: false, error})
    }
}