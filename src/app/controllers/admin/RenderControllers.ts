import {Request, Response, NextFunction} from 'express'
import {injectFile} from '../../../utils/inject'

// Add files to layout
const files = {
    cssFile: injectFile('public/css', 'global'),
    jsFile: injectFile('public/js', 'global')
} 
const slug = 'minh-toan'

class RenderControllers {

    // [GET] /admin/dashboard
    dashboard(req: Request, res: Response, next: NextFunction) {
        try {
            const title = 'Trang chủ | PDP Greenwich Vietnam'
            const dashboard = 'active'
            res.status(200).render('admin/dashboard', {
                layout: 'layouts/admin/index', files, title, dashboard, slug
            })
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /admin/profile/:slug
    profile(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).render('admin/profile', {
                layout: 'layouts/admin/index', files, slug
            })
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /admin/scores
    scores(req: Request, res: Response, next: NextFunction) {
        try {
            const title = 'Điểm số | PDP Greenwich Vietnam'
            const scores = 'active'
            res.status(200).render('admin/scores', {
                layout: 'layouts/admin/index', files, title, scores, slug
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    // GET /admin/system
    system(req: Request, res: Response, next: NextFunction) {
        try {
            const title = 'Hệ thống | PDP Greenwich Vietnam'
            const system = 'active'
            res.status(200).render('admin/system', {
                layout: 'layouts/admin/index', files, title, system, slug
            })
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /admin/tutorial
    tutorial(req: Request, res: Response, next: NextFunction) {
        try {
            const title = 'Hướng dẫn | PDP Greenwich Vietnam'
            const tutorial =  'active'
            res.status(200).render('admin/tutorial', {
                layout: 'layouts/admin/index', files, title, tutorial, slug
            })
        } catch (error) {
            console.log(error);
        }
    }


    //~ MAIL
    // [GET] /admin/mail/sent
    mailSent(req: Request, res: Response, next: NextFunction) {
        try {
            const title = 'Mail | PDP Greenwich Vietnam'
            const mail = 'active'
            res.status(200).render('admin/mail/sent', {
                layout: 'layouts/admin/index', files, title, mail, slug
            })
        } catch (error) {
            console.log(error);
        }
    }


    //~ MANAGE
    // [GET] /admin/manage-clubs
    clubs(req: Request, res: Response, next: NextFunction) {
        try {
            const title = 'Câu lạc bộ | PDP Greenwich Vietnam'
            const manageClubs = 'active'
            res.status(200).render('admin/manage/clubs', {
                layout: 'layouts/admin/index', files, title, manageClubs, slug
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    // [GET] /admin/club/:slug
    clubMembers(req: Request, res: Response, next: NextFunction) {
        try {
            const title = 'Câu lạc bộ | PDP Greenwich Vietnam'
            const manageClubs = 'active'
            res.status(200).render('admin/manage/club-members', {
                layout: 'layouts/admin/index', files, title, manageClubs, slug
            })
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /admin/events
    events(req: Request, res: Response, next: NextFunction) {
        try {
            const title = 'Sự kiện | PDP Greenwich Vietnam'
            const events = 'active'
            res.status(200).render('admin/manage/events', {
                layout: 'layouts/admin/index', files, title, events, slug
            })
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /admin/students
    students(req: Request, res: Response, next: NextFunction) {
        try {
            const title = 'Sinh viên | PDP Greenwich Vietnam'
            const students = 'active'
            res.status(200).render('admin/manage/students', {
                layout: 'layouts/admin/index', files, title, students, slug
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new RenderControllers
