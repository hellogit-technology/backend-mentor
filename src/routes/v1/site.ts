import express from 'express';
import loginController from '../../app/controllers/v1/LoginControllers';
import adminController from '../../app/controllers/v1/Admin/IndexControllers'

const router = express.Router();

router.get('/', adminController.adminRender)
router.get('/login', loginController.loginRender);

export default router;
