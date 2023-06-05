import { Request, Response, Router } from 'express';
import { ClubAccount, AdminAccount, Campus, Club, Event, Student, Scores } from '../models';
import { getBase64Image } from '../../utils/convertImage';

class ValidationControllers {
  public router = Router();

  constructor() {
    this.router;
    this.initRoutes();
  }

  private initRoutes() {

    // Valid Id
    this.router.post('/valid-campus', this.campusIsValid);
    this.router.post('/valid-club', this.clubIsValid);

    // Exist - Create 
    this.router.post('/exist-account-email', this.accountEmailExist);
    this.router.post('/exist-club-id', this.clubIdExist);
    this.router.post('/exist-club-email', this.clubEmailExist);
    this.router.post('/exist-club-nickname', this.clubNickNameExist);
    this.router.post('/exist-event-id', this.eventIdExist);
    this.router.post('/exist-student-id', this.studentIdExist);
    this.router.post('/exist-student-email', this.studentEmailExist);

    // Exist - Update
    this.router.post('/update-email-admin', this.emailAdminUpdate);
    this.router.post('/update-email-club', this.emailClubUpdate);
    this.router.post('/update-club-id', this.clubIdUpdate)
    this.router.post('/update-club-email', this.clubEmailUpdate)
    this.router.post('/update-club-nickname', this.clubNickNameUpdate)
    this.router.post('/update-event-id', this.eventIdUpdate)
    this.router.post('/update-student-id', this.studentIdUpdate)
    this.router.post('/update-student-email', this.studentEmailUpdate)

    // Helpers
    this.router.post('/download-qrcode', this.downloadQRCode);
    this.router.post('/event/qrcode-status', this.getStatusExpire);
    this.router.post('/event/:id/expire', this.setStatusExpire);
  }

  private responseMessage = (statusCode: number, message: string | boolean) => (req: Request, res: Response) => {
    return res.status(statusCode).json(message);
  };
  
  // Filter query statement
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

  
  // Download QRCode - payload base64Image/false
  private downloadQRCode = async (req: Request, res: Response) => {
    try {
      const { imageURL } = req.body;
      if (!imageURL) return this.responseMessage(404, false)
      const base64Image = await getBase64Image(imageURL);
      if(!base64Image) return this.responseMessage(404, false)
      this.responseMessage(200, base64Image as string)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };

  /**
   * @function setStatusExpire
   * @method POST /api/event/:id/expire
   * @returns
   */

  public setStatusExpire = async (req: Request, res: Response) => {
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
  };

  /**
   * @function getStatusExpire
   * @method POST /api/event/qrcode-status
   * @returns
   */

  public getStatusExpire = async (req: Request, res: Response) => {
    try {
      const { eventId } = req.body;
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json('Not exist');
      const expire = event['expire'];
      res.status(200).json(expire);
    } catch (error) {
      res.status(500).json('Error');
    }
  };

  
  // Valid Campus - payload true/false
  private campusIsValid = async(req: Request, res: Response) => {
    try {
      const { campus } = req.body;
      const result = await Campus.findById(campus);
      if (!result) return this.responseMessage(404, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };


  // Valid Club - payload true/false
  private clubIsValid = async(req: Request, res: Response) => {
    try {
      const { club } = req.body;
      const result = await Club.findById(club);
      if (!result) return this.responseMessage(404, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };

  
  // Exist Id Club - payload true/false
  private clubIdExist = async (req: Request, res: Response) => {
    try {
      const { clubId } = req.body;
      const result = await Club.findOne({ clubId: this.sanitize(clubId) });
      if (result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };


  // Exist Email Club - payload true/false
  private clubEmailExist = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const result = await Club.findOne({ email: this.sanitize(email) });
      if (result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };

  
  // Exist Nickname Club - payload true/false
  private clubNickNameExist = async (req: Request, res: Response) => {
    try {
      const { nickname } = req.body;
      const result = await Club.findOne({ nickname: this.sanitize(nickname) });
      if (result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };


  // Exist Id Student - payload true/false
  private studentIdExist = async (req: Request, res: Response) => {
    try {
      const { schoolId } = req.body;
      const result = await Student.findOne({ schoolId: this.sanitize(schoolId) });
      if (result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };


  // Exist Email Student - payload true/false
  private studentEmailExist = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const result = await Student.findOne({ email: this.sanitize(email) });
      if (result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };


  // Exist Id Event - payload true/false
  private eventIdExist = async (req: Request, res: Response) => {
    try {
      const { eventId } = req.body;
      const result = await Event.findOne({ eventId: this.sanitize(eventId) });
      if (result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };


  // Exist Email Account - payload true/false
  private accountEmailExist = async(req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const [adminResult, clubResult] = await Promise.all([AdminAccount.findOne({ email: this.sanitize(email) }), ClubAccount.findOne({ email: this.sanitize(email) })]);
      if(adminResult || clubResult) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };


  // Update Email Admin Account - payload true/false
  private emailAdminUpdate = async (req: Request, res: Response) => {
    try {
      const { email, id } = req.body;
      const result = await AdminAccount.findOne({ email: this.sanitize(email), _id: { $ne: this.sanitize(id) } });
      if (result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };


  // Update Email Club Account - payload true/false
  private emailClubUpdate = async(req: Request, res: Response) => {
    try {
      const { email, id } = req.body;
      const result = await ClubAccount.findOne({ email: this.sanitize(email), _id: { $ne: this.sanitize(id) } });
      if (result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  };


  // Update Id Club - payload true/false
  private clubIdUpdate = async(req: Request, res: Response) => {
    try {
      const { clubId, id } = req.body
      const result = await Club.findOne({ clubId: this.sanitize(clubId), _id: { $ne: this.sanitize(id)}})
      if(result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  }


  // Update Email Club - payload true/false
  private clubEmailUpdate = async(req: Request, res: Response) => {
    try {
      const { email, id} = req.body
      const result = await Club.findOne({ email: this.sanitize(email), _id: { $ne: this.sanitize(id)}})
      if(result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  }


  // Update Nickname Club - payload true/false
  private clubNickNameUpdate = async(req: Request, res: Response) => {
    try {
      const { nickname, id } = req.body
      const result = await Club.findOne({ nickname: this.sanitize(nickname), _id: { $ne: this.sanitize(id)}})
      if(result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  }


  // Update Id Event - payload true/false
  private eventIdUpdate = async(req: Request, res: Response) => {
    try {
      const { eventId, id } = req.body
      const result = await Event.findOne({ clubId: this.sanitize(eventId), _id: { $ne: this.sanitize(id)}})
      if(result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  }


  // Update Id Student - payload true/false
  private studentIdUpdate = async(req: Request, res: Response) => {
    try {
      const { schoolId, id } = req.body
      const result = await Student.findOne({ schoolId: this.sanitize(schoolId), _id: { $ne: this.sanitize(id)}})
      if(result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  }


  // Update Email Student - payload true/false
  private studentEmailUpdate = async(req: Request, res: Response) => {
    try {
      const { email, id } = req.body
      const result = await Student.findOne({ email: this.sanitize(email), _id: { $ne: this.sanitize(id)}})
      if(result) return this.responseMessage(400, false)
      this.responseMessage(200, true)
    } catch (error) {
      this.responseMessage(500, false)
    }
  }
}

export default new ValidationControllers();
