import { Request, Response, NextFunction } from 'express';
import { injectFile } from '../../utils/inject';

/**
 * @description Handle Login/Logout
 * @author Merlin Le
 */

class LoginControllers {
  /**
   * [GET] /login
   * @function loginRender
   * @description Render login page
   */

  public async loginRender(req: Request, res: Response, next: NextFunction) {
    try {
      const messages = req.flash('message')[0];
      const files = {
        cssFile: injectFile('public/css', 'login'),
        jsFile: injectFile('public/js', 'login')
      };
      const title = 'Đăng nhập | PDP Greenwich Vietnam';
      const heading = 'Đăng nhập';
      res.status(200).render('login/index', { layout: false, messages, files, title, heading });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /logout
   * @function logout
   * @pdescription End session logout CMS
   */

  public logout(req: Request, res: Response, next: NextFunction) {
    if (req.session) {
      req.session.destroy((error) => {
        if (error) console.table(error);
        return res.redirect('/login');
      });
    } else {
      res.end();
    }
  }
}

export default new LoginControllers();
