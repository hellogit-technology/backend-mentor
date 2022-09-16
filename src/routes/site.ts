import express from 'express';
import loginControllers from '../app/controllers/LoginControllers';

const router = express.Router();

router.get('/login', loginControllers.loginRender);

export default router;
