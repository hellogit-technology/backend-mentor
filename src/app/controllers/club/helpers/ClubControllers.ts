import { Request, Response } from 'express';
import { AccountSession } from '../../../../interface/ISession';

class ClubControllers {
  /**
   * @function updateClub
   * @param req
   * @param res
   * @param next
   */

  public async updateClub(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  /**
   * @function addMember
   * @param req
   * @param res
   * @param next
   */

  public async addMember(req: Request, res: Response) {
    try {
      const accountSession: AccountSession = req.user!;
      const { schoolId } = req.body;
    } catch (error) {}
  }

  /**
   * @function updateMember
   * @param req
   * @param res
   * @param next
   */

  public async updateMember(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  /**
   * @function removeMember
   * @param req
   * @param res
   * @param next
   */

  public async removeMember(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
}

export default new ClubControllers();
