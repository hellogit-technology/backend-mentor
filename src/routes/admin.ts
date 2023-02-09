import express, { Request, Response, NextFunction } from 'express';
import renderControllers from '../app/controllers/admin/RenderControllers';

const router = express.Router();

// Render
router.get('/dashboard', renderControllers.dashboard);
router.get('/profile/:slug', renderControllers.profile);
router.get('/scores', renderControllers.scores);
router.get('/system', renderControllers.system);
router.get('/tutorial', renderControllers.tutorial);
router.get('/leader-accounts', renderControllers.leaderAccounts);
router.get('/admin-accounts', renderControllers.adminAccounts)
router.get('/clubs', renderControllers.clubs);
router.get('/club/:slug', renderControllers.clubMembers);
router.get('/events', renderControllers.events);
router.get('/students', renderControllers.students);
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/admin/dashboard');
});

// Event

export default router;
