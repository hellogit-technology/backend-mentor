import {Request, Response, NextFunction, Router} from 'express';
import renderControllers from '../app/controllers/leader/RenderControllers';

const router = Router();

router.get('/dashboard', renderControllers.dashboard);
router.get('/input-scores', renderControllers.inputScores);
router.get('/history-scores', renderControllers.historyScores)
router.get('/profile', renderControllers.profile);
router.get('/tutorial', renderControllers.tutorial);
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.redirect('/club/dashboard');
});

export default router;
