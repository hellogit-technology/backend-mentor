import { Request, Response, NextFunction } from 'express';
import { messageVietnamese } from '../../../utils/message';
import { cloudinary } from '../../../config/cloudinary';
import { makeSlug } from '../../../utils/slugify';
import { Campus, Event } from '../../models';
import { generate } from '../../../utils/generateQRCode';
import { makeUniqueID } from '../../../utils/uniqueID';
import {dataUri} from '../../../config/multer'

class EventsControllers {
  // [POST] /api/event
  public async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseEvent {
        eventId: string;
        name: string;
        date: string;
        campus: string;
        club?: string[];
        poster: {
          photo: string;
          cloudinaryId: string;
        };
        slug: string;
        participant?: string[];
        qrcode: {
          photo: string;
          cloudinaryId: string;
        };
        expire: boolean;
        editor: string;
      }

      const profileSession: any = req.user;
      const { eventName, campus, date, club } = req.body;

      // Generate QR Code
      const checkingDomain = process.env.CHECKING_EVENT_DOMAIN!;
      const imageBrandUrl = process.env.IMAGE_URL!;
      const eventSlug = makeSlug(eventName);
      const campusQuery = await Campus.findById(campus);
      const cityId = campusQuery?.shortId as string;
      const eventId = makeUniqueID('event', cityId, 4);
      const checkingLink = `${checkingDomain}/${eventId}/${eventSlug}`;
      const base64Image = await generate(checkingLink, imageBrandUrl);

      // Upload to Cloudinary
      const qrCodeResult = await cloudinary.v2.uploader.upload(base64Image, { folder: 'QRCode' });
      const photo = dataUri(req).content
      if(!photo) {
        throw new Error('Not found file')
      }
      const posterResult = await cloudinary.v2.uploader.upload(photo, { folder: 'Event' });

      const requestBody: BaseEvent = {
        eventId: eventId,
        name: eventName,
        date: date,
        campus: campus,
        poster: {
          photo: posterResult['secure_url'],
          cloudinaryId: posterResult['public_id']
        },
        slug: eventSlug,
        qrcode: {
          photo: qrCodeResult['secure_url'],
          cloudinaryId: qrCodeResult['public_id']
        },
        expire: false,
        editor: profileSession['userId'] as string
      };

      if (club) {
        requestBody['club'] = club;
      }
      const newEvent = new Event(requestBody);
      const savedStudent = await newEvent.save();
      req.flash('result', 'successfully')
      req.flash('message', messageVietnamese.RES004B('sự kiện'));
      res.redirect('/admin/events');
    } catch (error) {
      req.session.modalAccount = 'event';
      req.flash('result', 'failed')
      req.flash('message', messageVietnamese.RES004A('sự kiện'));
      res.redirect('/admin/events');
    }
  }

  // [PATCH] /api/event/:id
  public async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseEventUpdate {
        eventId?: string;
        name?: string;
        date?: string;
        campus?: string;
        club?: string[];
        poster?: {
          photo: string;
          cloudinaryId: string;
        };
        slug?: string;
        participant?: string[];
        qrcode?: {
          photo: string;
          cloudinaryId: string;
        };
        expire?: boolean;
        editor: string;
      }
      const profileSession: any = req.user;
      const { eventName, campus, date, club } = req.body;
      const event = await Event.findById(req.params.id);

      const requestBody: BaseEventUpdate = {
        editor: profileSession['userId'] as string
      };

      // Generate QR Code
      const checkingDomain = process.env.CHECKING_EVENT_DOMAIN!;
      const imageBrandUrl = process.env.IMAGE_URL!;

      if (campus) {
        const campusQuery = await Campus.findById(campus);
        const cityId = campusQuery?.shortId as string;
        const eventId = makeUniqueID('event', cityId, 4);
        requestBody['campus'] = campus;

        if (eventName) {
          requestBody['name'] = eventName;
          const eventSlug = makeSlug(eventName);
          const checkingLink = `${checkingDomain}/${eventId}/${eventSlug}`;
          const base64Image = await generate(checkingLink, imageBrandUrl);
          const public_id = event?.qrcode?.cloudinaryId;
          await cloudinary.v2.uploader.destroy(public_id!.toString());
          const qrCodeResult = await cloudinary.v2.uploader.upload(base64Image, { folder: 'QRCode' });
          requestBody['slug'] = eventSlug;
          requestBody['qrcode']!.photo = qrCodeResult['secure_url'];
          requestBody['qrcode']!.cloudinaryId = qrCodeResult['public_id'];
        } else {
          const checkingLink = `${checkingDomain}/${eventId}/${event!['slug']}`;
          const base64Image = await generate(checkingLink, imageBrandUrl);
          const public_id = event?.qrcode?.cloudinaryId;
          await cloudinary.v2.uploader.destroy(public_id!.toString());
          const qrCodeResult = await cloudinary.v2.uploader.upload(base64Image, { folder: 'QRCode' });
          requestBody['qrcode']!.photo = qrCodeResult['secure_url'];
          requestBody['qrcode']!.cloudinaryId = qrCodeResult['public_id'];
        }
      }

      if (date) {
        requestBody['date'] = date;
      }
      if (club) {
        requestBody['club'] = club;
      }

      if (req.file!.path) {
        const public_id = event?.poster;
        await cloudinary.v2.uploader.destroy(public_id!.toString());
        const posterResult = await cloudinary.v2.uploader.upload(req.file!.path, { folder: 'Event' });
        requestBody['poster']!.photo = posterResult['secure_url'];
        requestBody['poster']!.cloudinaryId = posterResult['public_id'];
      }
      await event!.updateOne({ $set: requestBody });
      req.flash('result', 'successfully')
      req.flash('message', messageVietnamese.RES002B('sự kiện'));
      res.redirect('/admin/events');
    } catch (error) {
      req.flash('result', 'failed')
      req.flash('message', messageVietnamese.RES002A('sự kiện'));
      res.redirect('/admin/events');
    }
  }

  // [DELETE] /api/event/:id
  public async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await Event.findById(req.params.id);
      await event!.deleteOne();
      req.flash('result', 'successfully')
      req.flash('message', messageVietnamese.RES003B('sự kiện'));
      res.redirect('/admin/events');
    } catch (error) {
      req.flash('result', 'failed')
      req.flash('message', messageVietnamese.RES003A('sự kiện'));
      res.redirect('/admin/events');
    }
  }
}

export default new EventsControllers();
