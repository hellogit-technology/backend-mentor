import { Request, Response, NextFunction } from 'express';

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  const profileSession: any = req.user
  if (profileSession['isLogged'] !== true) {
    return res.redirect('/login')
  }
  return next();
};

export const checkAuthLeader = (req: Request, res: Response, next: NextFunction) => {
  const session: any = req.user;
  if (session.role !== 2) {
    return res.redirect('back');
  }
  return next();
};

export const checkAuthPDP = (req: Request, res: Response, next: NextFunction) => {
  const session: any = req.user;
  if (session.role !== 0 && session.role !== 1) {
    return res.redirect('back');
  }
  return next();
};
