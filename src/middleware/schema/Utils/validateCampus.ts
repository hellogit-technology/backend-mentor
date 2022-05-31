import { check } from 'express-validator';
import { messageVietnamese } from '../../../utils/message';

//? CREATE CAMPUS
export const campusSchema = [
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
      if (valueLength >= 50) {
        throw new Error(messageVietnamese.ER002A('name', 50, valueLength));
      }
      return true;
    })
    .trim(),
  check('address.*')
    .not()
    .isEmpty()
    .withMessage(messageVietnamese.ER001('address'))
    .bail()
    .custom((value: string) => {
      return value.trim().length != 0;
    })
    .withMessage(messageVietnamese.ER001('address'))
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
        throw new Error(messageVietnamese.ER002A('address', 100, valueLength));
      }
      return true;
    })
    .trim()
];

//? UPDATE CAMPUS
export const campusUpdateSchema = [
  check('name')
    .custom((value: string) => {
      if (value) {
        return value.trim().length != 0;
      }
      return true;
    })
    .withMessage(messageVietnamese.ER005)
    .bail()
    .custom((value: string) => {
      const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
      if (value) {
        return !regex2Bytes.test(value);
      }
      return true;
    })
    .withMessage(messageVietnamese.ER004)
    .bail()
    .custom((value: string) => {
      if (value) {
        const valueLength = value.length;
        if (valueLength >= 50) {
          throw new Error(messageVietnamese.ER002A('name', 50, valueLength));
        }
      }
      return true;
    })
    .trim(),
  check('address.*')
    .custom((value: string) => {
      if (value) {
        return value.trim().length != 0;
      }
      return true;
    })
    .withMessage(messageVietnamese.ER005)
    .bail()
    .custom((value: string) => {
      const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
      if (value) {
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
          throw new Error(messageVietnamese.ER002A('address', 100, valueLength));
        }
      }
      return true;
    })
    .trim()
];
