import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).render('status/404', { layout: false });
});

export default router;
