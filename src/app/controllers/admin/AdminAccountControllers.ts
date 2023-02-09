import { Request, Response, NextFunction } from 'express';
import { AdminAccount } from '../../models';
import { messageVietnamese } from '../../../utils/message';
import { AccountSession } from '../../../types/Passport';

/**
 * @description Handle Admin RestfulAPI
 * @author Merlin Le
 */

class AdminAccountControllers {
  /**
   * [POST] /api/admin-account
   * @function createAdmin
   * @description Create admin account (PDP role)
   */

  public async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseAdminAccount {
        fullname: string;
        email: string;
        campus: string;
        role: number;
        editor: string;
      }

      const accountSession: AccountSession = req.user!;
      const { fullname, email, campus, role } = req.body;
      const requestBody: BaseAdminAccount = {
        fullname: fullname,
        email: email,
        campus: campus,
        role: role as number,
        editor: accountSession['userId'] as string
      };
      const newAdminAccount = new AdminAccount(requestBody);
      await newAdminAccount.save();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES004B('admin account'));
      res.redirect('/admin/admin-accounts');
    } catch (error) {
      req.flash('modalAdminAccount', 'true');
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES004A('admin account'));
      res.redirect('/admin/admin-accounts');
    }
  }

  /**
   * [PATCH] /api/admin-account/:id
   * @function updateAdmin
   * @description Update admin account (PDP role)
   */

  public async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseAdminAccountUpdate {
        fullname?: string;
        email?: string;
        campus?: string;
        role?: number;
        editor: string;
      }

      const accountSession: AccountSession = req.user!;
      const { fullname, email, campus, role } = req.body;
      let requestBody: BaseAdminAccountUpdate = {
        editor: accountSession['userId'] as string
      };
      if (fullname) requestBody['fullname'] = fullname;
      if (email) requestBody['email'] = email;
      if (campus) requestBody['campus'] = campus;
      if (role) requestBody['role'] = role;
      const admin = await AdminAccount.findById(req.params.id);
      await admin!.updateOne({ $set: requestBody });
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES002B('admin account'));
      res.redirect('/admin/admin-accounts');
    } catch (error) {
      req.flash('modalAdminAccount', 'true');
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES002A('admin account'));
      res.redirect('/admin/admin-accounts');
    }
  }

  /**
   * [DELETE] /api/admin-account/:id
   * @function deleteAdmin
   * @description Delete admin account (PDP role)
   */

  public async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await AdminAccount.findById(req.params.id);
      await admin!.deleteOne();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES003B('admin account'));
      res.redirect('/admin/admin-accounts');
    } catch (error) {
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES003A('admin account'));
      res.redirect('/admin/admin-accounts');
    }
  }
}

export default new AdminAccountControllers();
