import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';

interface StructureError {
  [key: string]: Pick<ValidationError, 'msg' | 'value'>;
}

class Validation {
  private handler = (elements: ValidationError[]) => {
    const object: StructureError = {};
    for (const element of elements) {
      let msg = element.msg;
      object[element.param] = {
        msg,
        value: element.value
      };
    }
    return object;
  };

  public validationRender = (req: Request, res: Response, next: NextFunction) => {
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
  };

  public validationParam = (req: Request, res: Response, next: NextFunction) => {
    const errorPayload = {
      status: 400,
      message: 'Invalid param'
    };
    const paramId = req.params.id;
    const regex = /^[a-z0-9]+$/;
    const limitLength = 24;
    if (!regex.test(paramId)) return res.status(400).json(errorPayload);
    if (paramId.length !== limitLength) return res.status(400).json(errorPayload);
    return next();
  };

  
}

export default new Validation();
