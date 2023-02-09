import { Request, Response, NextFunction } from 'express';
import { LeaderAccount, AdminAccount, Campus, Club, Event, Student, Scores } from '../models';
import { getBase64Image } from '../../utils/convertImage';

/**
 * @description Handle helpers RestfulAPI
 * @author Merlin Le
 */

class HelpersControllers {


  private validateBody(data: string, ) {

  }

  /**
   * [POST] /api/download-qrcode
   * @function downloadQRCode
   * @description Download QRCode image
   */

  public async downloadQRCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageURL } = req.body;
      if (!imageURL) return res.status(404).json(false);
      const base64Image = await getBase64Image(imageURL);
      res.status(200).json(base64Image);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * [POST] /api/event/:id/expire
   * @function setStatusExpire
   * @description
   */

  public async setStatusExpire(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = req.params.id;
      const { expire } = req.body;
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ status: 'Not exist eventId' });
      const baseExpire = event['expire'];
      if (baseExpire !== expire && expire === 'true') {
        await Event.updateOne({ $set: { expire: true } });
        return res.status(200).json({ status: 'expired' });
      }

      if (baseExpire !== expire && expire === 'false') {
        await Event.updateOne({ $set: { expire: false } });
        return res.status(200).json({ status: 'alive' });
      }
      res.status(404).json({ status: 'Unidentified Operation' });
    } catch (error) {
      res.status(500).json({ status: 'Error' });
    }
  }

  /**
   * [POST] /api/event/qrcode-status
   * @function
   * @description
   */

  public async getStatusExpire(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.body;
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json('Not exist');
      const expire = event['expire'];
      res.status(200).json(expire);
    } catch (error) {
      res.status(500).json('Error');
    }
  }

  /**
   * [POST] /api/valid-campus
   * @function campusIsValid
   * @description Check campus data is valid
   */

  public async campusIsValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { campus } = req.body;
      const result = await Campus.findById(campus);
      if (result) return res.status(200).json(true);
      return res.status(200).json(false);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   *  [POST] /api/valid-club
   * @function clubIsValid
   * @description Check club data is valid
   */

  public async clubIsValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { club } = req.body;
      const result = await Club.findById(club);
      if (result) return res.status(200).json(true);
      return res.status(200).json(false);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * [POST] /api/check-club-id
   * @function clubIdExist
   * @description Check club ID is existed
   */

  public async clubIdExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { clubId } = req.body;
      const club = await Club.findOne({ clubId: clubId });
      if (club) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * [POST] /api/check-club-email
   * @function clubEmailExist
   * @description Check club email is existed
   */

  public async clubEmailExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const club = await Club.findOne({ email: email });
      if (club) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * [POST] /api/check-club-nickname
   * @function clubNicknameExist
   * @description Check club nickname is existed
   */

  public async clubNicknameExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { nickname } = req.body;
      const club = await Club.findOne({ nickname: nickname });
      if (club) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * [POST] /api/check-student-id
   * @function studentIdExist
   * @description Check student ID is existed
   */

  public async studentIdExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { schoolId } = req.body;
      const student = await Student.findOne({ schoolId: schoolId });
      if (student) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * [POST] /api/check-student-email
   * @function studentEmailExist
   * @description Check student email is existed
   */

  public async studentEmailExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const student = await Student.findOne({ email: email });
      if (student) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * [POST] /api/check-event-id
   * @function eventIdExist
   * @description Check event ID is existed
   */

  public async eventIdExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.body;
      const event = await Event.findOne({ eventId: eventId });
      if (event) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * [POST] /api/check-account-email
   * @function accountEmailExist
   * @description Check account email is existed
   */

  public async accountEmailExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const [emailAdmin, emailLeader] = await Promise.all([AdminAccount.findOne({ email: email }), LeaderAccount.findOne({ email: email })]);
      if (emailLeader || emailAdmin) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * [POST] /api/check-account-email-admin-update
   * @function accountEmailAdminUpdate
   * @description Check admin email is existed when update
   */

  public async accountEmailAdminUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, id } = req.body;
      const emailAdmin = await AdminAccount.findOne({ email: email, _id: { $ne: id } });
      if (emailAdmin) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * [POST] /api/check-account-email-leader-update
   * @function accountEmailLeaderUpdate
   * @description Check leader email is existed when update
   */

  public async accountEmailLeaderUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, id } = req.body;
      const emailLeader = await LeaderAccount.findOne({ email: email, _id: { $ne: id } });
      if (emailLeader) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }
}

export default new HelpersControllers();
