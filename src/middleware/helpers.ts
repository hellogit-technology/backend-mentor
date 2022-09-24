import { Request, Response, NextFunction } from 'express';
import moment from 'moment-timezone';

const showData = (req: Request, res: Response, next: NextFunction) => {
  // Show select month
  res.locals.selectMonth = parseInt(moment(new Date()).tz('Asia/Ho_Chi_Minh').format('M'));

  next();
};

export default showData;
