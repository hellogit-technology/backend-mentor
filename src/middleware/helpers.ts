import { Request, Response, NextFunction } from 'express';
import {AdminAccount} from '../app/models'
import moment from 'moment-timezone';

const showData = (req: Request, res: Response, next: NextFunction) => {
  // Show select month
  res.locals.selectMonth = parseInt(moment(new Date()).tz('Asia/Ho_Chi_Minh').format('M'));

  // Format date (UTC +07)
  res.locals.formatDate = (value?: string | Date, format: string = 'DD/MM/YYYY', tz: string = 'Asia/Ho_Chi_Minh') => {
    if (!value) {
      return '';
    }
    const data = moment(value);
    if (!data.isValid()) {
      return value;
    }
    data.tz(tz);
    return data.format(format);
  };

  next();
};

export default showData;
