import { Router } from 'express';
import adminHandlerControllers from '../app/controllers/admin/AdminHandlerControllers';
import validationControllers from '../app/controllers/ValidationControllers';
import clubHandlerControllers from '../app/controllers/club/ClubHandlerControllers';
import auth from '../middleware/guard/auth';
import throttling from '../middleware/guard/throttling';

const router = Router();

router.use('/validation', throttling.rateLimitation(), validationControllers.router);
router.use('/admin', auth.roleAccess(['Admin', 'PDPManager']), adminHandlerControllers.router);
router.use('/club', auth.roleAccess(['ClubManager']), clubHandlerControllers.router);

export default router;
