import { Request, Response } from 'express';
import { messageVietnamese } from '../../../../utils/message';
import { Campus, Event } from '../../../models';
import { IEvent } from '../../../../interface/IEvent'
import { IAccountSession } from '../../../../interface/ISession';
import { generate } from '../../../../utils/generateQRCode';
import { makeSlug } from '../../../../utils/slugify';
import uniqueID from '../../../../utils/uniqueID';
import handleImage from '../../../../utils/handleImage';

class EventsControllers {
  private CREATE_SUCCESS = messageVietnamese.RES004B('sự kiện');
  private CREATE_FAILED = messageVietnamese.RES004A('sự kiện');
  private UPDATE_SUCCESS = messageVietnamese.RES002B('sự kiện');
  private UPDATE_FAILED = messageVietnamese.RES002A('sự kiện');
  private DELETE_SUCCESS = messageVietnamese.RES003B('sự kiện');
  private DELETE_FAILED = messageVietnamese.RES003A('sự kiện');
  private CHECKING_DOMAIN = process.env.CHECKING_EVENT_DOMAIN!
  private LOGO_QRCODE = process.env.LOGO_QRCODE_IMAGE!


  private responseMessage = (statusCode: number, message: string) => (req: Request, res: Response) => {
    return res.status(statusCode).json({
      status: statusCode,
      message: message
    });
  };

  // Create an event
  public createEvent = async(req: Request, res: Response) => {
    try {
      // const accountSession: IAccountSession = req.user!;
      // const { eventName, campus, date, club } = req.body;

      // const campusQuery = await Campus.findById(campus);
      // const cityId = campusQuery?.shortId as string;
      // const eventId = uniqueID.generateId('event', cityId, 4);

      // const eventSlug = makeSlug(eventName)
      // const checkingLink = `${checkingDomain}/${eventId}/${eventSlug}`;
      // const base64Image = await generate(checkingLink, imageBrandUrl);
      // const photo = dataUri(req).content;
      // if (!photo) throw new Error('Not found image');
      // const [qrCodeResult, posterResult] = await Promise.all([cloudinary.v2.uploader.upload(base64Image, { folder: 'QRCode' }), cloudinary.v2.uploader.upload(photo, { folder: 'Event' })]);
      

      // const newEvent = new Event<IEvent>({
      //   eventId: eventId as string,
      //   name: eventName as string,
      //   date: date as string,
      //   campus: campus as string,
      //   poster: {
      //     photo: posterResult['secure_url'] as string,
      //     cloudinaryId: posterResult['public_id'] as string
      //   },
      //   slug: ,
      //   qrcode: {
      //     photo: qrCodeResult['secure_url'] as string,
      //     cloudinaryId: qrCodeResult['public_id'] as string
      //   },
      //   expire: false,
      //   editor: accountSession['userId'] as string
      // });
      // await newEvent.save();
      
    } catch (error) {
      this.responseMessage(500, this.UPDATE_FAILED);
    }
  }

  // Update an event
  public updateEvent = async(req: Request, res: Response) => {
    try {
      // const accountSession: IAccountSession = req.user!;
      // const { eventName, campus, date, club } = req.body;
      // const event = await Event.findById(req.params.id);
      // const requestBody: UpdateEvent = {
      //   editor: accountSession['userId'] as string
      // };
      // const checkingDomain = process.env.CHECKING_EVENT_DOMAIN!;
      // const imageBrandUrl = process.env.IMAGE_URL!;

      // if (campus) {
      //   const campusQuery = await Campus.findById(campus);
      //   const cityId = campusQuery?.shortId as string;
      //   const eventId = makeUniqueID('event', cityId, 4);
      //   requestBody['campus'] = campus;

      //   if (eventName) {
      //     requestBody['name'] = eventName;
      //     const eventSlug = makeSlug(eventName);
      //     const checkingLink = `${checkingDomain}/${eventId}/${eventSlug}`;
      //     const base64Image = await generate(checkingLink, imageBrandUrl);
      //     const public_id = event?.qrcode?.cloudinaryId;
      //     await cloudinary.v2.uploader.destroy(public_id!.toString());
      //     const qrCodeResult = await cloudinary.v2.uploader.upload(base64Image, { folder: 'QRCode' });
      //     requestBody['slug'] = eventSlug;
      //     requestBody['qrcode']!.photo = qrCodeResult['secure_url'];
      //     requestBody['qrcode']!.cloudinaryId = qrCodeResult['public_id'];
      //   } else {
      //     const checkingLink = `${checkingDomain}/${eventId}/${event!['slug']}`;
      //     const base64Image = await generate(checkingLink, imageBrandUrl);
      //     const public_id = event?.qrcode?.cloudinaryId;
      //     await cloudinary.v2.uploader.destroy(public_id!.toString());
      //     const qrCodeResult = await cloudinary.v2.uploader.upload(base64Image, { folder: 'QRCode' });
      //     requestBody['qrcode']!.photo = qrCodeResult['secure_url'];
      //     requestBody['qrcode']!.cloudinaryId = qrCodeResult['public_id'];
      //   }
      // }
      // if (date) requestBody['date'] = date;
      // if (club) requestBody['club'] = club;
      // if (req.file!.path) {
      //   const public_id = event?.poster;
      //   await cloudinary.v2.uploader.destroy(public_id!.toString());
      //   const posterResult = await cloudinary.v2.uploader.upload(req.file!.path, { folder: 'Event' });
      //   requestBody['poster']!.photo = posterResult['secure_url'];
      //   requestBody['poster']!.cloudinaryId = posterResult['public_id'];
      // }
      // await event!.updateOne({ $set: requestBody });
      // req.flash('result', 'successfully');
      // req.flash('message', messageVietnamese.RES002B('sự kiện'));
      // res.redirect('/admin/events');
    } catch (error) {
      this.responseMessage(500, this.UPDATE_FAILED);
    }
  }

  // Delete an event
  public deleteEvent = async(req: Request, res: Response) => {
    try {
      const event = await Event.findById(req.params.id);
      await event!.deleteOne();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES003B('sự kiện'));
      res.redirect('/admin/events');
    } catch (error) {
      this.responseMessage(500, this.UPDATE_FAILED);
    }
  }

  // Get all event
  public getManyEvent = async(req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
    } catch (error) {
      
    }
  }

  // Get a event
  public getOneEvent = async(req: Request, res: Response) => {
    try {
      
    } catch (error) {
      
    }
  }
}

export default new EventsControllers();
