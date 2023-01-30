import { Request, Response, NextFunction } from 'express';

class PosterControllers {
  // [POST] /api/poster
  async uploadPosters(req: Request, res: Response, next: NextFunction) {
    try {
      res.attachment();
    } catch (error) {}
  }
}

export default new PosterControllers();
