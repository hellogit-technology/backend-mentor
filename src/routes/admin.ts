import express, {Request, Response, NextFunction} from 'express';
import renderControllers from '../app/controllers/admin/RenderControllers';

const router = express.Router()

router.get('/dashboard', renderControllers.dashboard)
router.get('/profile/:slug', renderControllers.profile)
router.get('/scores', renderControllers.scores)
router.get('/system', renderControllers.system)
router.get('/tutorial', renderControllers.tutorial)
router.get('/mail/sent', renderControllers.mailSent)
router.get('/mail', (req: Request, res: Response, next: NextFunction) => {
    res.redirect('/admin/mail/sent')
})
router.get('/manage-clubs', renderControllers.clubs)
router.get('/club/:slug', renderControllers.clubMembers)
router.get('/events', renderControllers.events)
router.get('/students', renderControllers.students)

export default router