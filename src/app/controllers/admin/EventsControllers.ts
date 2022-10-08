import { Request, Response, NextFunction } from 'express';
import {messageVietnamese} from '../../../utils/message'
import {cloudinary} from '../../../config/cloudinary'
import {makeSlug} from '../../../config/slugify'


class EventsControllers {
  // [POST] /
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      interface RequestBody {

      }
    } catch (error) {}
  }

  // [PATCH] /
  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      interface RequestBody {

      }
    } catch (error) {}
  }

  // [DELETE] /
  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }
}

export default new EventsControllers();
