import { Request, Response, NextFunction } from 'express';
import { AdminAccount } from '../../models';
import { messageVietnamese } from '../../../utils/message';

class AdminAccountControllers {
  // [POST] /api/admin-account
  async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseAdminAccount {
        fullname: string;
        email: string;
        campus: string;
        role: number;
        editor: string;
      }
      const profileSession: any = req.user;
      const { fullname, email, campus, role } = req.body;
      const requestBody: BaseAdminAccount = {
        fullname: fullname,
        email: email,
        campus: campus,
        role: role as number,
        editor: profileSession['userId'] as string
      };
      const newAdminAccount = new AdminAccount(requestBody);
      const savedAdminAccount = await newAdminAccount.save();
      req.flash('message', `${messageVietnamese.RES004B} (Admin Account)`);
      res.redirect('/admin/accounts');
    } catch (error) {
      req.session.modalAccount = 'admin';
      req.flash('error', `${messageVietnamese.RES004A} (Admin Account)`);
      res.redirect('/admin/accounts');
    }
  }

  // [PATCH] /api/admin-account/:id
  async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseAdminAccountUpdate {
        fullname?: string;
        email?: string;
        campus?: string;
        role?: number;
        editor: string;
      }
      const profileSession: any = req.user;
      const { fullname, email, campus, role } = req.body;
      let requestBody: BaseAdminAccountUpdate = {
        editor: profileSession['userId'] as string
      };
      if (fullname) {
        requestBody['fullname'] = fullname;
      }
      if (email) {
        requestBody['email'] = email;
      }
      if (campus) {
        requestBody['campus'] = campus;
      }
      if (role) {
        requestBody['role'] = role;
      }
      const admin = await AdminAccount.findById(req.params.id);
      await admin!.updateOne({ $set: requestBody });
      req.flash('message', `${messageVietnamese.RES002B} (Admin Account)`);
      res.redirect('/admin/accounts');
    } catch (error) {
      req.session.modalAccount = 'admin';
      req.flash('error', `${messageVietnamese.RES002A} (Admin Account)`);
      res.redirect('/admin/accounts');
    }
  }

  // [DELETE] /api/admin-account/:id
  async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await AdminAccount.findById(req.params.id);
      await admin!.deleteOne();
      req.flash('message', `${messageVietnamese.RES003B} (Admin Account)`);
      res.redirect('/admin/accounts');
    } catch (error) {
      req.flash('error', `${messageVietnamese.RES003A} (Admin Account)`);
      res.redirect('/admin/accounts');
    }
  }
}

export default new AdminAccountControllers();
