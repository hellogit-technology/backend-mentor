import { Request, Response, NextFunction } from 'express';
import { injectFile } from '../../utils/inject';

class LoginControllers {
  // [GET] /login
  async loginRender(req: Request, res: Response, next: NextFunction) {
    try {
      const messages = req.flash('message')[0];
      const files = {
        cssFile: injectFile('public/css', 'login'),
        jsFile: injectFile('public/js', 'login')
      };
      const title = 'Đăng nhập | PDP Greenwich Vietnam';
      res.status(200).render('login/index', { layout: false, messages, files, title });
    } catch (error) {
      console.log(error);
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
