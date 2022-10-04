import { Request, Response, NextFunction } from 'express';
import { LeaderAccount } from '../../models';

class LeaderAccountControllers {
  // [POST] /api/leader-account
  async createLeader(req: Request, res: Response, next: NextFunction) {
    try {
      const newLeaderAccount = new LeaderAccount(req.body);
      const savedLeaderAccount = await newLeaderAccount.save();
      res.redirect('/admin/accounts');
    } catch (error) {
      console.log(error);
    }
  }

  // [PATCH] /api/leader-account/:id
  async updateLeader(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await LeaderAccount.findById(req.params.id);
      await admin!.updateOne({ $set: req.body });
      res.redirect('/admin/accounts');
    } catch (error) {
      console.log(error);
    }
  }

  // [DELETE] /api/leader-account/:id
  async deleteLeader(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await LeaderAccount.findById(req.params.id);
      await admin!.deleteOne();
      res.redirect('/admin/accounts');
    } catch (error) {
      console.log(error);
    }
  }
}

export default new LeaderAccountControllers();
