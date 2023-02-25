import { Request, Response, NextFunction, Router } from 'express';
import passport from 'passport';
import { requiredAuth } from '../middleware/auth';
import { AccountSession } from '../types/Passport';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  })
);

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }), (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.redirect('/login');
  const session: AccountSession = req.user;
  if (session.role === 0 || session.role === 1) return res.redirect('/admin');
  return res.redirect('/club');
});

router.get('/logout', requiredAuth, (req: Request, res: Response, next: NextFunction) => {
  if (req.session) {
    return req.session.destroy((err) => {
      if (err) return res.status(400).json('Unable to log out');
      return res.redirect('/login');
    });
  }
  return res.end();
});

export default router;
