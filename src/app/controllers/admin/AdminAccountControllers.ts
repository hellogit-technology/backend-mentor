import { Request, Response, NextFunction } from 'express';
import {AdminAccount} from '../../models'

class AdminAccountControllers {
  // [POST] /api/admin-account
  async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const newAdminAccount = new AdminAccount(req.body)
        const savedAdminAccount = await newAdminAccount.save()
        res.redirect('/admin/accounts')
    } catch (error) {
        console.log(error);
    }
  }

  // [PATCH] /api/admin-account/:id
  async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const admin = await AdminAccount.findById(req.params.id)
        await admin!.updateOne({ $set: req.body})
        res.redirect('/admin/accounts')
    } catch (error) {
        console.log(error);
    }
  }

  // [DELETE] /api/admin-account/:id
  async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const admin = await AdminAccount.findById(req.params.id)
        await admin!.deleteOne()
        res.redirect('/admin/accounts')
    } catch (error) {
        console.log(error);
    }
  }
}

export default new AdminAccountControllers();
