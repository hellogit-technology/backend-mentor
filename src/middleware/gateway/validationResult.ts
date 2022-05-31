import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';

class ValidationResult {
  handler(elements: ValidationError[]) {
    const object: { [key: string]: Pick<ValidationError, 'msg' | 'value'> } = {};
    for (const element of elements) {
      let msg = element.msg;
      object[element.param] = {
        msg,
        value: element.value
      };
    }
    return object;
  }

  validationRender(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const object = this.handler(errors.array());
      const keys = Object.keys(object);
      for (const key of keys) {
        req.flash(key, object[key].msg);
      }
      return res.redirect('back');
    }
    next();
  }

  validationAPI(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

export default new ValidationResult();
