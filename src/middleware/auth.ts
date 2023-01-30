import { Request, Response, NextFunction } from 'express';
import {AccountSession} from '../types/Passport'

export const requiredAuth  = (req: Request, res: Response, next: NextFunction) => {
  if(req.isUnauthenticated()) return res.redirect('/login');
  return next();
};

export const checkAuthLeader = (req: Request, res: Response, next: NextFunction) => {
  if(!req.user) return res.redirect('/login')
  const session: AccountSession = req.user;
  if(session.role !== 2) return res.redirect('back');
  return next();
};

export const checkAuthPDP = (req: Request, res: Response, next: NextFunction) => {
  if(!req.user) return res.redirect('/login')
  const session: AccountSession = req.user;
  if(session.role !== 0 && session.role !== 1) return res.redirect('back');
  return next();
};
