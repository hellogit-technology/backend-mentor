import { Request, Response, NextFunction } from 'express';

class LoginControllers {
  // [GET] /login
  async loginRender(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render('login/login', { layout: false });
    } catch (error) {
      res.status(500).render('status/500', { layout: false, error });
    }
  }

  // [POST] /login/auth
  async loginAuth(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      res.status(500).render('status/500', { layout: false, error });
    }
  }

  // [GET] /logout
  logout(req: Request, res: Response, next: NextFunction) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).json({
            message: 'Unable to log out',
            error: err
          });
        }
        return res.redirect('/login');
      });
    } else {
      res.end();
    }
  }
}

export default new LoginControllers();
