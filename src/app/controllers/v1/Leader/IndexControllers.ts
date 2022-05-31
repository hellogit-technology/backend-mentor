import { Request, Response, NextFunction } from 'express';

class LeaderControllers {
  leaderRender(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render('leader/index', { layout: false, title: 'Leader' });
    } catch (error) {
      res.status(500).render('status/500', { layout: false, error });
    }
  }
}

export default new LeaderControllers();
