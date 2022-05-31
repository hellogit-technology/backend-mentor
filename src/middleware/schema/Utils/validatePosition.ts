import { check } from 'express-validator';
import { messageVietnamese } from '../../../utils/message';

//? CREATE POSITION
export const positionSchema = [
  check('name')
    .not()
    .isEmpty()
    .withMessage(messageVietnamese.ER001('name'))
    .bail()
    .custom((value: string) => {
      return value.trim().length != 0;
    })
    .withMessage(messageVietnamese.ER001('name'))
    .bail()
    .custom((value: string) => {
      const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
      return !regex2Bytes.test(value);
    })
    .withMessage(messageVietnamese.ER004)
    .bail()
    .custom((value: string) => {
      const valueLength = value.length;
      if (valueLength >= 100) {
        throw new Error(messageVietnamese.ER002A('name', 100, valueLength));
      }
      return true;
    })
    .trim()
];

//? UPDATE POSITION
export const positionUpdateSchema = [
  check('name')
    .custom((value: string) => {
      if (value) {
        return value.trim().length != 0;
      }
      return true;
    })
    .withMessage(messageVietnamese.ER001('name'))
    .bail()
    .custom((value: string) => {
      if (value) {
        const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
        return !regex2Bytes.test(value);
      }
      return true;
    })
    .withMessage(messageVietnamese.ER004)
    .bail()
    .custom((value: string) => {
      if (value) {
        const valueLength = value.length;
        if (valueLength >= 100) {
          throw new Error(messageVietnamese.ER002A('name', 100, valueLength));
        }
      }
      return true;
    })
    .trim()
];
