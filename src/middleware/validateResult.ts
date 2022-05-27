import { ValidationError, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Handle Array
const handler = (elements: ValidationError[]) => {
  const object: { [key: string]: Pick<ValidationError, 'msg' | 'value'> } = {};
  for (const element of elements) {
    let msg = element.msg;
    object[element.param] = {
      msg,
      value: element.value
    };
  }
  return object;
};

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const object = handler(errors.array());
      const keys = Object.keys(object);
      for (const key of keys) {
        req.flash(key, object[key].msg);
      }
      return res.redirect('back');
    }
    next();
};


