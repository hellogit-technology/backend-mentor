import express, { Request, Response, NextFunction } from 'express';
import {injectFile} from '../utils/inject'

const router = express.Router();

router.get('*', (req: Request, res: Response, next: NextFunction) => {
  const files = {
    cssFile: injectFile('public/css', '404'),
  }
  res.status(404).render('status/404', { layout: false , files});
});

export default router;
