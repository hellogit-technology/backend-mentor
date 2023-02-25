import { Request, Response, NextFunction } from 'express';
import { LeaderAccount, AdminAccount, Campus, Club, Event, Student, Scores } from '../models';
import { getBase64Image } from '../../utils/convertImage';

/**
 * @description Handle helpers RestfulAPI
 * @author Merlin Le
 */

class HelpersControllers {

  /**
   * @function maxLength Check lengh data
   * @returns true/false
   */

  private maxLength = (data: string, max: number) => {
    return data.length <= max
  }

  /**
   * @function sanitize Prevent NoSQL injection
   * @param query Query filter mongo
   * @returns filterd object
   */

  private sanitize = (query: unknown) => {
    if (query instanceof Object) {
        for (let key in query) {
            if (/^\$/.test(key)) {
                delete query[key as keyof typeof query];
            } else {
                this.sanitize(query[key as keyof typeof query]);
            }
        }
    }
    return query;
  };

  /**
   * @function downloadQRCode Download QRCode image
   * @method POST /api/download-qrcode
   * @returns true/false
   */

  public downloadQRCode = async(req: Request, res: Response, next: NextFunction) => {
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
   * @function setStatusExpire
   * @method POST /api/event/:id/expire
   * @returns
   */

  public setStatusExpire = async(req: Request, res: Response, next: NextFunction) => {
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
   * @function getStatusExpire 
   * @method POST /api/event/qrcode-status
   * @returns
   */

  public getStatusExpire = async(req: Request, res: Response, next: NextFunction) => {
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
   * @function campusIsValid Check campus data is valid
   * @method POST /api/valid-campus
   * @returns true/false
   */

  public campusIsValid = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { campus } = req.body;
      if(!this.maxLength(campus, 24)) return res.status(200).json(false);
      const result = await Campus.findById(campus);
      if (result) return res.status(200).json(true);
      return res.status(200).json(false);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function clubIsValid Check club data is valid
   * @method POST /api/valid-club
   * @returns true/false
   */

  public clubIsValid = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { club } = req.body;
      if(!this.maxLength(club, 24)) return res.status(200).json(false);
      const result = await Club.findById(club);
      if (result) return res.status(200).json(true);
      return res.status(200).json(false);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function clubIdExist Check club ID is existed
   * @method POST /api/check-club-id
   * @returns true/false
   */

  public clubIdExist = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { clubId } = req.body;
      if(!this.maxLength(clubId, 30)) return res.status(200).json(false);
      const club = await Club.findOne({ clubId: this.sanitize(clubId)});
      if (club) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function clubEmailExist Check club email is existed
   * @method POST /api/check-club-email
   * @returns true/false
   */

  public clubEmailExist = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      if(!this.maxLength(email, 100)) return res.status(200).json(false);
      const club = await Club.findOne({ email: this.sanitize(email)});
      if (club) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function clubNicknameExist Check club nickname is existed
   * @method POST /api/check-club-nickname
   * @returns true/false
   */

  public clubNicknameExist = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { nickname } = req.body;
      if(!this.maxLength(nickname, 50)) return res.status(200).json(false);
      const club = await Club.findOne({ nickname: this.sanitize(nickname) });
      if (club) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function studentIdExist Check student ID is existed
   * @method POST /api/check-student-id
   * @returns true/false
   */

  public studentIdExist = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { schoolId } = req.body;
      if(!this.maxLength(schoolId, 30)) return res.status(200).json(false);
      const student = await Student.findOne({ schoolId: this.sanitize(schoolId) });
      if (student) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function studentEmailExist Check student email is existed
   * @method POST /api/check-student-email
   * @returns true/false
   */

  public studentEmailExist = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      if(!this.maxLength(email, 100)) return res.status(200).json(false);
      const student = await Student.findOne({ email: this.sanitize(email) });
      if (student) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function eventIdExist Check event ID is existed
   * @method POST /api/check-event-id 
   * @returns true/false
   */

  public eventIdExist = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { eventId } = req.body;
      if(!this.maxLength(eventId, 30)) return res.status(200).json(false);
      const event = await Event.findOne({ eventId: this.sanitize(eventId) });
      if (event) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function accountEmailExist Check account email is existed
   * @method POST /api/check-account-email
   * @returns true/false
   */

  public accountEmailExist = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      if(!this.maxLength(email, 100)) return res.status(200).json(false);
      const [emailAdmin, emailLeader] = await Promise.all([AdminAccount.findOne({ email: this.sanitize(email) }), LeaderAccount.findOne({ email: this.sanitize(email) })]);
      if (emailLeader || emailAdmin) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function accountEmailAdminUpdate Check admin email is existed when update
   * @method POST /api/check-account-email-admin-update
   * @returns true/false
   */

  public accountEmailAdminUpdate = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, id } = req.body;
      if(!this.maxLength(email, 100) || !this.maxLength(id, 24)) return res.status(200).json(false);
      const emailAdmin = await AdminAccount.findOne({ email: this.sanitize(email), _id: { $ne: this.sanitize(id) } });
      if (emailAdmin) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function accountEmailLeaderUpdate Check leader email is existed when update
   * @method POST /api/check-account-email-leader-update
   * @returns true/false
   */

  public accountEmailLeaderUpdate = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, id } = req.body;
      if(!this.maxLength(email, 100) || !this.maxLength(id, 24)) return res.status(200).json(false);
      const emailLeader = await LeaderAccount.findOne({ email: this.sanitize(email), _id: { $ne: this.sanitize(id) } });
      if (emailLeader) return res.status(200).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  /**
   * @function schoolIdAvailable Check school id is available
   * @method POST /api/check-student-id-available
   * @returns true/false
   */

  public schoolIdAvailable= async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { schoolId } = req.body;
      if(!this.maxLength(schoolId, 30)) return res.status(200).json(false);
      const student = await Student.findOne({ schoolId: this.sanitize(schoolId) });
      if (student) return res.status(200).json(true);
      return res.status(200).json(false);
    } catch (error) {
      res.status(500).json(false);
    }
  }
}

export default new HelpersControllers();
