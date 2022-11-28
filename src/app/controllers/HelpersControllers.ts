import { Request, Response, NextFunction } from 'express';
import { generate } from '../../utils/generateQRCode';
import { makeSlug } from '../../utils/slugify';
import { LeaderAccount, AdminAccount, Campus, Club, Event, Student, Scores } from '../models';

class HelpersControllers {
  // [POST] /api/generateqrcode
  async qrcodeGenerate(req: Request, res: Response, next: NextFunction) {
    try {
      const failedGenerate = {
        status: false,
        message: 'Can not generate qrcode'
      };
      const { eventId, eventName } = req.body;
      const domainChecking = process.env.DOMAIN_CHECKING_EVENT!;
      if (!eventId || !eventName) {
        return res.status(200).json(failedGenerate);
      }
      const slugEvent = makeSlug(eventName);
      const urlCheckingEvent = `${domainChecking}/${eventId}/${slugEvent}`;
      const logoQRCode =
        'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/308581596_443907851175067_6120826876682676291_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=EfCu8QcrNygAX9mNv45&tn=CwR_3-WgLiXtoYie&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT9T6glie4LIj7c9TzscMvEEgYgM5fIPfaJ8qtgPV9tB_g&oe=63488194';
      const qrcode = await generate(urlCheckingEvent, logoQRCode);
      if (!qrcode) {
        res.status(200).json(failedGenerate);
      } else {
        res.status(200).json({
          status: true,
          qrcode: qrcode
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [POST] /api/check-campus
  async campusIsValid(req: Request, res: Response, next: NextFunction) {
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
  async clubIsValid(req: Request, res: Response, next: NextFunction) {
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
  async clubIdExist(req: Request, res: Response, next: NextFunction) {
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
  async clubEmailExist(req: Request, res: Response, next: NextFunction) {
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
  async clubNicknameExist(req: Request, res: Response, next: NextFunction) {
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
  async studentIdExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { schoolId } = req.body;
      const student = await Event.findOne({ schoolId: schoolId });
      if (student) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-student-email
  async studentEmailExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const student = await Event.findOne({ email: email });
      if (student) {
        return res.status(200).json(false);
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }

  // [POST] /api/check-event-id
  async eventIdExist(req: Request, res: Response, next: NextFunction) {
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
  async accountEmailExist(req: Request, res: Response, next: NextFunction) {
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
  async accountEmailPDPUpdate(req: Request, res: Response, next: NextFunction) {
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
  async accountEmailLeaderUpdate(req: Request, res: Response, next: NextFunction) {
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
