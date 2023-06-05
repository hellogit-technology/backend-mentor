import { Request, Response, NextFunction } from 'express';

export const redirectHTTPS = (req: Request, res: Response, next: NextFunction) => {
  if (req.get('X-Forwarded-Proto') === 'http') {
    res.redirect('https://' + req.headers.host + req.url);
  }
  return next();
};
