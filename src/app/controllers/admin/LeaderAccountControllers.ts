import { Request, Response, NextFunction } from 'express';
import { LeaderAccount } from '../../models';
import { messageVietnamese } from '../../../utils/message';
import { AccountSession } from '../../../types/Passport';

/**
 * @description Handle Leader RestfulAPI
 * @author Merlin Le
 */

class LeaderAccountControllers {

  /**
   * @function createLeader Create leader account (Leader role)
   * @method POST /api/leader-account
   */

  public createLeader = async(req: Request, res: Response, next: NextFunction) => {
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
      const accountSession: AccountSession = req.user!;
      const { fullname, email, campus, role, club, schoolId } = req.body;
      const requestBody: BaseLeaderAccount = {
        fullname: fullname,
        email: email,
        schoolId: schoolId,
        campus: campus,
        role: role as number,
        club: club,
        editor: accountSession['userId'] as string
      };
      const newLeaderAccount = new LeaderAccount(requestBody);
      await newLeaderAccount.save();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES004B('leader account'));
      res.redirect('/admin/leader-accounts');
    } catch (error) {
      req.flash('modalLeaderAccount', 'true');
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES004A('leader account'));
      res.redirect('/admin/leader-accounts');
    }
  }

  /**
   * @function updateLeader Update leader account (Leader role)
   * @method PATCH /api/leader-account/:id
   */

  public updateLeader = async(req: Request, res: Response, next: NextFunction) => {
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
      const accountSession: AccountSession = req.user!;
      const { fullname, email, campus, role, club, schoolId } = req.body;
      let requestBody: BaseLeaderAccountUpdate = {
        editor: accountSession['userId'] as string
      };
      if (fullname) requestBody['fullname'] = fullname;
      if (email) requestBody['email'] = fullname;
      if (campus) requestBody['campus'] = campus;
      if (role) requestBody['role'] = role;
      if (club) requestBody['club'] = club;
      if (schoolId) requestBody['schoolId'] = schoolId;
      const leader = await LeaderAccount.findById(req.params.id);
      await leader!.updateOne({ $set: requestBody });
      req.flash('result', 'successfully');
      req.flash('message', `${messageVietnamese.RES002B} (Leader Account)`);
      res.redirect('/admin/leader-accounts');
    } catch (error) {
      req.flash('modalLeaderAccount', 'true');
      req.flash('result', 'failed');
      req.flash('message', `${messageVietnamese.RES002A} (Leader Account)`);
      res.redirect('/admin/leader-accounts');
    }
  }

  /**
   * @function deleteLeader Remove leader account (Leader role)
   * @method DELETE /api/leader-account/:id
   */

  public deleteLeader = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const leader = await LeaderAccount.findById(req.params.id);
      await leader!.deleteOne();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES003B('leader account'));
      res.redirect('/admin/leader-accounts');
    } catch (error) {
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES003A('leader account'));
      res.redirect('/admin/leader-accounts');
    }
  }
}

export default new LeaderAccountControllers();
