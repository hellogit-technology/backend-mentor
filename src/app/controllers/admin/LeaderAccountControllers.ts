import { Request, Response, NextFunction } from 'express';
import { LeaderAccount } from '../../models';
import { messageVietnamese } from '../../../utils/message';

class LeaderAccountControllers {
  // [POST] /api/leader-account
  async createLeader(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseLeaderAccount {
        fullname: string;
        email: string;
        schoolId: string;
        campus: string;
        role: number;
        club: string;
        editor: string;
      }
      const profileSession: any = req.user;
      const { fullname, email, campus, role, club, schoolId } = req.body;
      const requestBody: BaseLeaderAccount = {
        fullname: fullname,
        email: email,
        schoolId: schoolId,
        campus: campus,
        role: role as number,
        club: club,
        editor: profileSession['userId'] as string
      };
      const newLeaderAccount = new LeaderAccount(requestBody);
      const savedLeaderAccount = await newLeaderAccount.save();
      req.flash('message', `${messageVietnamese.RES004B} (Leader Account)`);
      res.redirect('/admin/accounts');
    } catch (error) {
      req.session.modalAccount = 'leader';
      req.flash('error', `${messageVietnamese.RES004A} (Leader Account)`);
      res.redirect('/admin/accounts');
    }
  }

  // [PATCH] /api/leader-account/:id
  async updateLeader(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseLeaderAccountUpdate {
        fullname?: string;
        email?: string;
        schoolId?: string;
        campus?: string;
        role?: number;
        club?: string;
        editor: string;
      }
      const profileSession: any = req.user;
      const { fullname, email, campus, role, club, schoolId } = req.body;
      let requestBody: BaseLeaderAccountUpdate = {
        editor: profileSession['userId'] as string
      };
      if (fullname) {
        requestBody['fullname'] = fullname;
      }
      if (email) {
        requestBody['email'] = fullname;
      }
      if (campus) {
        requestBody['campus'] = campus;
      }
      if (role) {
        requestBody['role'] = role;
      }
      if (club) {
        requestBody['club'] = club;
      }
      if (schoolId) {
        requestBody['schoolId'] = schoolId;
      }
      const leader = await LeaderAccount.findById(req.params.id);
      await leader!.updateOne({ $set: requestBody });
      req.flash('message', `${messageVietnamese.RES002B} (Leader Account)`);
      res.redirect('/admin/accounts');
    } catch (error) {
      req.session.modalAccount = 'leader';
      req.flash('error', `${messageVietnamese.RES002A} (Leader Account)`);
      res.redirect('/admin/accounts');
    }
  }

  // [DELETE] /api/leader-account/:id
  async deleteLeader(req: Request, res: Response, next: NextFunction) {
    try {
      const leader = await LeaderAccount.findById(req.params.id);
      await leader!.deleteOne();
      req.flash('message', `${messageVietnamese.RES003B} (Leader Account)`);
      res.redirect('/admin/accounts');
    } catch (error) {
      req.session.modalAccount = 'leader';
      req.flash('error', `${messageVietnamese.RES003A} (Leader Account)`);
      res.redirect('/admin/accounts');
    }
  }
}

export default new LeaderAccountControllers();
