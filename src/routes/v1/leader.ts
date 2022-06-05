import express, { Request, Response, NextFunction } from 'express';
import leaderController from '../../app/controllers/v1/Leader/IndexControllers';

const router = express.Router();

router.get('/:slug', leaderController.leaderRender);

export default router;
