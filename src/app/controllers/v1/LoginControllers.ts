import { Request, Response, NextFunction } from 'express';
import { messageVietnamese } from '../../../utils/message';
import { Account, Campus, Club } from '../../models';
import bcrypt from 'bcrypt';
import { check } from 'express-validator';
import slugify from 'slugify';

class LoginControllers {
  // [GET] /login
  async loginRender(req: Request, res: Response, next: NextFunction) {
    try {
      const campus = await Campus.find({});
      res.status(200).render('login/login', { layout: false, campus });
    } catch (error) {
      res.status(500).render('status/500', { layout: false, error });
    }
  }

  // [POST] /login/auth
  async loginAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, campus } = req.body;

      //? Base
      const returnLogin = (): void => {
        req.flash('checkLogin', messageVietnamese.RES001);
        return res.redirect('/login');
      };

      const redirectByRole = (role: string, accountId: string, username: string, path: string): void => {
        req.session.role = role;
        req.session.logged = true;
        req.session.accountId = accountId;
        req.session.username = username;
        return res.redirect(`${path}`);
      };

      const checkAccount = await Account.findOne({
        username: username,
        deleted_at: null
      });

      //? Check username
      if (checkAccount === null) {
        returnLogin;
      }

      //? Check password
      const hashedPassword = checkAccount.password;
      const checkPasswordIsCorrect: boolean = bcrypt.compareSync(password, hashedPassword);

      if (checkPasswordIsCorrect !== true) {
        returnLogin;
      }

      //? Check campus
      const campusOrigin = checkAccount.campus;

      if (campus !== campusOrigin) {
        returnLogin;
      }

      //? Redirect
      const roleOrigin = checkAccount.role;
      if (roleOrigin === 'admin') {
        redirectByRole(roleOrigin, checkAccount['_id'], checkAccount.username, '/');
      }

      if (roleOrigin === 'mentor') {
        redirectByRole(roleOrigin, checkAccount['_id'], checkAccount.username, '/');
      }

      if (roleOrigin === 'leader') {
        //? Slug library configuration
        const options = {
          replacement: '-',
          remove: /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          lower: true,
          strict: false,
          locale: 'en',
          trim: true
        };

        //? Find name of club
        const club = await Club.findById(checkAccount.club);
        const nameClub = club.name;

        //? Convert to slug
        const clubSlug = slugify(nameClub, options);

        redirectByRole(roleOrigin, checkAccount['_id'], checkAccount.username, `/club/${clubSlug}`);
      }
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
