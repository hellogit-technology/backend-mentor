import express, { Request, Response, NextFunction } from 'express';
import loginController from '../../app/controllers/v1/LoginControllers';
import adminController from '../../app/controllers/v1/Admin/IndexControllers';
import accountController from '../../app/controllers/v1/Admin/AccountControllers';
import validationResult from '../../middleware/gateway/validationResult';
import { clearCache } from '../../middleware/clearCache';
import { mentorSchema, mentorUpdateSchema, leaderSchema, leaderUpdateSchema } from '../../middleware/schema/Admin/validateAccount';
import { loginSchema } from '../../middleware/schema/validateLogin';

const router = express.Router();

//? Login
router.get('/login', loginController.loginRender);
router.get('/logout', clearCache, loginController.logout);
router.post('/login/auth', loginSchema, validationResult.validationRender, loginController.loginAuth);

//? Account
router.get('/accounts', accountController.accountRender);
router.post('/account/mentor', mentorSchema, validationResult.validationRender, accountController.accountMentor);
router.post('/account/leader', leaderSchema, validationResult.validationRender, accountController.accountLeader);
router.route('/account/mentor/:id').patch(mentorUpdateSchema, validationResult.validationRender, accountController.updateMentor).delete(accountController.deleteMentor);
router.route('/account/leader/:id').patch(leaderUpdateSchema, validationResult.validationRender, accountController.updateLeader).delete(accountController.deleteLeader);

//? Index Admin
router.get('/', adminController.adminRender);

export default router;
