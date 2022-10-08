import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { isLogged } from '../middleware/auth';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  })
);

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }), (req: Request, res: Response, next: NextFunction) => {
  const session: any = req.user;
  if (session.role === 0 || session.role === 1) {
    return res.redirect('/admin');
  }
  return res.redirect('/');
});

router.get('/logout', isLogged, (req: Request, res: Response, next: NextFunction) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json('Unable to log out');
      }
      return res.redirect('/login');
    });
  } else {
    res.end();
  }
});

export default router;
