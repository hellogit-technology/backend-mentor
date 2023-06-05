import { Request, Response, NextFunction } from 'express';
import { IAccountSession } from '../../interface/ISession';
import { Role } from './role';

type IRole = 'Admin' | 'PDPManager' | 'ClubManager';

class Auth {
  public isLogged = (req: Request, res: Response, next: NextFunction) => {
    if (req.isUnauthenticated()) return res.redirect('/login');
    return next();
  };

  public roleAccess = (role: IRole[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.redirect('/login');
    const session: IAccountSession = req.user;

    if (role.length === 1) {
      if (session.role !== Role[role[0]]) return res.redirect('back');
    }

    if (role.length > 1) {
      if (session.role !== Role[role[0]] && session.role !== Role[role[1]]) return res.redirect('back');
    }

    return next();
  };
}

export default new Auth();
