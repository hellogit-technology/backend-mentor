import { Request, Response, Router } from 'express';
import passport from 'passport';
import auth from '../../middleware/guard/auth';
import { Role } from '../../middleware/guard/role';
import { IAccountSession } from '../../interface/ISession';

class AuthControllers {
  public router = Router();

  constructor() {
    this.router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/google', passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
    }));
    this.router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }), this.redirectRoute);
    this.router.get('/logout', auth.isLogged, this.logout);
  }

  private redirectRoute = (req: Request, res: Response) => {
    if (!req.user) return res.redirect('/login');
    const session: IAccountSession = req.user;
    if (session.role === Role['Admin'] || session.role === Role['PDPManager']) return res.redirect('/admin');
    return res.redirect('/club');
  };

  private logout = (req: Request, res: Response) => {
    if (req.session) {
      return req.session.destroy((err) => {
        if (err) return res.status(400).json('Unable to log out');
        return res.redirect('/login');
      });
    }
    return res.end();
  };
}

export default new AuthControllers();
