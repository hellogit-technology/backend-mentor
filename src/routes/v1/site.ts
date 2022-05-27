import express, {Request, Response, NextFunction} from 'express';
import loginController from '../../app/controllers/v1/LoginControllers';
import adminController from '../../app/controllers/v1/Admin/IndexControllers'
import userController from '../../app/controllers/v1/Admin/AccountControllers'

const router = express.Router();

router.get('/login', loginController.loginRender);
router.get('/accounts', userController.accountRender)
router.get('/', adminController.adminRender)
router.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('status/404', {layout: false})
})

export default router;
