import { check } from 'express-validator';
import { messageVietnamese } from '../utils/message';

//? LOGIN SCHEMA
export const loginSchema = [
  check('campus').not().isEmpty().withMessage(messageVietnamese.ER001('Campus')),
  check('username')
    .not()
    .isEmpty()
    .withMessage(messageVietnamese.ER001('Username'))
    .bail()
    .custom((value) => {
      const maxCharacters: number = 10; //~ Notice
      const valueLength = value.length;
      if (valueLength > maxCharacters) {
        throw new Error(messageVietnamese.ER002('Username', maxCharacters, valueLength));
      }
      return true;
    }),
  check('password').not().isEmpty().withMessage(messageVietnamese.ER001('Password'))
];
