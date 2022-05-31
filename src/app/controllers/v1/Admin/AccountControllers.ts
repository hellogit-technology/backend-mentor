import { Request, Response, NextFunction } from 'express';
import Account from '../../../models/Account';
import bcrypt from 'bcrypt';
import { messageVietnamese } from '../../../../utils/message';

class AccountControllers {
  // [GET] /accounts
  accountRender(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render('admin/account/index', {
        layout: 'layouts/admin/index',
        title: 'Accounts | Management',
        chosen: 'account',
        leader: 'fdsdf',
        option: 'leader',
        role: 'admin'
      });
    } catch (error) {
      res.status(500).render('status/500', { layout: false, error });
    }
  }

  // [GET] /accounts/?

  // [POST] /account/mentor
  async accountMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, email, campus } = req.body;
      const role = 'mentor';

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create new mentor account
      const newMentor = new Account({
        username: username,
        password: hashedPassword,
        email: email,
        campus: campus,
        role: role
      });
      const savedMentor = await newMentor.save();

      // Message
      req.flash('successCreateMentor', messageVietnamese.RES004B);

      res.redirect('/accounts');
    } catch (error) {
      req.flash('failedCreateMentor', messageVietnamese.RES004A);
      res.redirect('/accounts');
    }
  }

  // [POST] /account/leader
  async accountLeader(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, email, campus, club } = req.body;
      const role = 'leader';

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create new mentor account
      const newLeader = new Account({
        username: username,
        password: hashedPassword,
        email: email,
        campus: campus,
        role: role,
        club: club
      });
      const savedLeader = await newLeader.save();

      // Message
      req.flash('successCreateLeader', messageVietnamese.RES004B);

      res.redirect('/accounts');
    } catch (error) {
      req.flash('failedCreateLeader', messageVietnamese.RES004A);
      res.redirect('/accounts');
    }
  }

  // [PATCH] /account/mentor/:id
  async updateMentor(req: Request, res: Response, next: NextFunction) {}

  // [PATCH] /account/leader/:id
  async updateLeader(req: Request, res: Response, next: NextFunction) {}

  // [DELETE] /account/mentor/:id
  async deleteMentor(req: Request, res: Response, next: NextFunction) {}

  // [DELETE] /account/leader/:id
  async deleteLeader(req: Request, res: Response, next: NextFunction) {}
}

export default new AccountControllers();
