import { Request, Response, NextFunction } from 'express';
import { messageVietnamese } from '../../../utils/message';
import { cloudinary } from '../../../config/cloudinary';
import { makeSlug } from '../../../utils/slugify';
import { Event } from '../../models';
import { generate } from '../../../utils/generateQRCode';

class EventsControllers {
  // [POST] /api/event
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseEvent {
        eventId: string;
        name: string;
        date: string;
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
      const { eventId, eventName, date, club } = req.body;

      // Generate QR Code
      const checkingDomain = process.env.CHECKING_EVENT_DOMAIN!;
      const imageBrandUrl = process.env.IMAGE_URL!;
      const eventSlug = makeSlug(eventName);
      const checkingLink = `${checkingDomain}/${eventId}/${eventSlug}`;
      const base64Image = await generate(checkingLink, imageBrandUrl);

      // Upload to Cloudinary
      const qrCodeResult = await cloudinary.v2.uploader.upload(base64Image, { folder: 'QRCode' });
      const posterResult = await cloudinary.v2.uploader.upload(req.file!.path, { folder: 'Event' });

      const requestBody: BaseEvent = {
        eventId: eventId,
        name: eventName,
        date: date,
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
      req.flash('message', messageVietnamese.RES004B);
      res.redirect('/admin/events');
    } catch (error) {
      req.session.modalAccount = 'event';
      req.flash('error', messageVietnamese.RES004A);
      res.redirect('/admin/events');
    }
  }

  // [PATCH] /api/event/:id
  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseEventUpdate {
        eventId?: string;
        name?: string;
        date?: string;
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
      const { eventId, eventName, date, club } = req.body;
      const event = await Event.findById(req.params.id);

      // Generate QR Code
      const checkingDomain = process.env.CHECKING_EVENT_DOMAIN!;
      const imageBrandUrl = process.env.IMAGE_URL!;

      const requestBody: BaseEventUpdate = {
        editor: profileSession['userId'] as string
      };

      if (eventId) {
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
        requestBody['eventId'] = eventId;
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
      req.flash('message', messageVietnamese.RES002B);
      res.redirect('/admin/events');
    } catch (error) {
      req.flash('error', messageVietnamese.RES002A);
      res.redirect('/admin/events');
    }
  }

  // [DELETE] /api/event/:id
  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await Event.findById(req.params.id);
      await event!.deleteOne();
      req.flash('message', messageVietnamese.RES003B);
      res.redirect('/admin/events');
    } catch (error) {
      req.flash('error', messageVietnamese.RES003A);
      res.redirect('/admin/events');
    }
  }

  // [POST] /api/event/:id/expire
  async setExpire(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = req.params.id;
      const { expire } = req.body;
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(500).json(false);
      }
      if (!expire) {
        return res.status(500).json(false);
      }
      if (expire === 'true' && event['expire'] === false) {
        await event.updateOne({ $set: { expire: true } });
        return res.status(200).json({ status: 'expired' });
      }
      if (expire === 'false' && event['expire'] === true) {
        await event.updateOne({ $set: { expire: false } });
        return res.status(200).json({ status: 'alive' });
      }
      return res.status(200).json(true);
    } catch (error) {
      res.status(500).json(false);
    }
  }
}

export default new EventsControllers();
