import { Request, Response, NextFunction } from 'express';
import { LeaderAccount, AdminAccount, Campus, Club, Event, Student, Scores } from '../models';
import {getBase64Image} from '../../utils/convertImage'

class HelpersControllers {
  // [POST] /api/download-qrcode
  public async downloadQRCode(req: Request, res: Response, next: NextFunction) {
    try {
      const {imageURL} = req.body
      if(!imageURL) return res.status(404).json(false)
      const base64Image = await getBase64Image(imageURL)
      res.status(200).json(base64Image)
    } catch (error) {
      res.status(500).json(false)
    }
  }

  // [POST] /api/event/:id/expire
  public async setStatusExpire(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = req.params.id
      const {expire} = req.body
      const event = await Event.findById(eventId)
      if(!event) return res.status(404).json({status: 'Not exist eventId'})
      const baseExpire = event['expire']
      if(baseExpire !== expire && expire === 'true') {
        await Event.updateOne({ $set: {expire: true} });
        return res.status(200).json({status: 'expired'})
      }

      if(baseExpire !== expire && expire === 'false') {
        await Event.updateOne({ $set: {expire: false} });
        return res.status(200).json({status: 'alive'})
      }
      res.status(404).json({status: 'Unidentified Operation'})
    } catch (error) {
      res.status(500).json({status: 'Error'})
    }
  }

  // [POST] /api/event/qrcode-status
  public async getStatusExpire(req: Request, res: Response, next: NextFunction) {
    try {
      const {eventId} = req.body
      const event = await Event.findById(eventId)
      if(!event) return res.status(404).json('Not exist')
      const expire = event['expire']
      res.status(200).json(expire)
    } catch (error) {
      res.status(500).json('Error')
    }
  }

  // [POST] /api/check-campus
  public async campusIsValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { campus } = req.body;
      const result = await Campus.findById(campus);
      if (result) {
        return res.status(200).json(true);
      }
      return res.status(200).json(false);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-club
  public async clubIsValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { club } = req.body;
      const result = await Club.findById(club);
      if (result) {
        return res.status(200).json(true);
      }
      return res.status(200).json(false);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-club-id
  public async clubIdExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { clubId } = req.body;
      const club = await Club.findOne({ clubId: clubId });
      if (club) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-club-email
  public async clubEmailExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const club = await Club.findOne({ email: email });
      if (club) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-club-nickname
  public async clubNicknameExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { nickname } = req.body;
      const club = await Club.findOne({ nickname: nickname });
      if (club) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-student-id
  public async studentIdExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { schoolId } = req.body;
      const student = await Student.findOne({ schoolId: schoolId });
      if (student) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-student-email
  public async studentEmailExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const student = await Student.findOne({ email: email });
      if (student) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-event-id
  public async eventIdExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.body;
      const event = await Event.findOne({ eventId: eventId });
      if (event) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-account-email
  public async accountEmailExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const emailPDP = await AdminAccount.findOne({ email: email });
      const emailLeader = await LeaderAccount.findOne({ email: email });
      if (emailLeader || emailPDP) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-account-email-pdp-update
  public async accountEmailPDPUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, id } = req.body;
      const emailPDP = await AdminAccount.findOne({ email: email, _id: { $ne: id } });
      if (emailPDP) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-account-email-leader-update
  public async accountEmailLeaderUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, id } = req.body;
      const emailLeader = await LeaderAccount.findOne({ email: email, _id: { $ne: id } });
      if (emailLeader) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }
}

export default new HelpersControllers();
