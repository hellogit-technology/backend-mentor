import express from 'express';
import renderControllers from '../app/controllers/leader/RenderControllers';

const router = express.Router();

router.get('/manage', renderControllers.club)
router.get('/scores', renderControllers.scores)
router.get('/profile', renderControllers.profile)
router.get('/tutorial', renderControllers.tutorial)
router.get('/:slug', renderControllers.dashboard)

export default router;
