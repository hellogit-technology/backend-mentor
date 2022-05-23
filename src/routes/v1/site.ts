import express from 'express';
import loginController from '../../app/controllers/v1/LoginControllers';
import adminController from '../../app/controllers/v1/Admin/IndexControllers'
import userController from '../../app/controllers/v1/Admin/AccountControllers'

const router = express.Router();

router.get('/login', loginController.loginRender);
router.get('/accounts', userController.userRender)
router.get('/', adminController.adminRender)

export default router;
