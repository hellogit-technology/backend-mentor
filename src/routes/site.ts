import express, {Request, Response, NextFunction} from 'express';
import loginControllers from '../app/controllers/LoginControllers';

const router = express.Router();

router.get('/login', loginControllers.loginRender);
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.redirect('/login')
})

export default router;
