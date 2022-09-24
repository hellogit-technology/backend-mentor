import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  })
);

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }), (req: Request, res: Response, next: NextFunction) => {
  // Successful authentication, redirect home.
  res.redirect('/');
});

export default router;
