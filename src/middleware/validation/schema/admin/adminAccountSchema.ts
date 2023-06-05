import { check } from 'express-validator';
import { messageVietnamese } from '../../../../utils/message';
import { AdminAccount, Campus, ClubAccount } from '../../../../app/models';

// CREATE MENTOR ACCOUNT
export const mentorSchema = [
  check('fullname')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('họ và tên'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('họ và tên'))
    .bail()
    .custom((value: string) => {
      const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
      return !regex2Bytes.test(value);
    })
    .withMessage(messageVietnamese.ER004)
    .bail()
    .custom((value: string) => {
      const valueLength = value.length;
      if (valueLength > 30) {
        throw new Error(messageVietnamese.ER002A('họ và tên', 30, valueLength));
      }
      return true;
    })
    .bail()
    .trim(),
  check('email')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('email'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('email'))
    .bail()
    .isLowercase()
    .withMessage(messageVietnamese.ER008)
    .bail()
    .custom((value) => {
      const regex =
        /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      return regex.test(value);
    })
    .withMessage(messageVietnamese.ER003)
    .bail()
    .custom((value: string) => {
      const valueLength = value.length;
      if (valueLength > 100) {
        throw new Error(messageVietnamese.ER002A('email', 100, valueLength));
      }
      return true;
    })
    .bail()
    .custom(async (value: string) => {
      const email = value.trim();
      const checkAdminEmail = await AdminAccount.findOne({
        email: email
      });
      const checkLeaderEmail = await ClubAccount.findOne({
        email: email
      });
      if (checkAdminEmail || checkLeaderEmail) {
        throw new Error(messageVietnamese.ER007('Email'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('campus')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('cơ sở đang làm việc'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('cơ sở đang làm việc'))
    .bail()
    .custom(async (value: string) => {
      const campusId = value.trim();
      const checkCampusId = await Campus.findById(campusId);
      if (!checkCampusId) {
        throw new Error(messageVietnamese.ER001('cơ sở đang làm việc'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('role')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('loại tài khoản'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('loại tài khoản'))
    .bail()
    .custom((value: string) => {
      if (parseInt(value) !== 0 && parseInt(value) !== 1) {
        throw new Error(messageVietnamese.ER001('loại tài khoản'));
      }
    })
    .bail()
    .trim()
];

// UPDATE MENTOR ACCOUNT
export const mentorUpdateSchema = [
  check('fullname')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('họ và tên'))
    .bail()
    .custom((value: string) => {
      const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
      return !regex2Bytes.test(value);
    })
    .withMessage(messageVietnamese.ER004)
    .bail()
    .custom((value: string) => {
      const valueLength = value.length;
      if (valueLength > 50) {
        throw new Error(messageVietnamese.ER002A('họ và tên', 50, valueLength));
      }
      return true;
    })
    .bail()
    .trim(),
  check('email')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('email'))
    .bail()
    .isLowercase()
    .withMessage(messageVietnamese.ER008)
    .bail()
    .custom((value) => {
      const regex =
        /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      return regex.test(value);
    })
    .withMessage(messageVietnamese.ER003)
    .bail()
    .custom((value: string) => {
      const valueLength = value.length;
      if (valueLength > 100) {
        throw new Error(messageVietnamese.ER002A('email', 100, valueLength));
      }
      return true;
    })
    .bail()
    .custom(async (value: string, { req }) => {
      const adminAccountId = req.params?.id;
      const email = value.trim();
      const checkAdminEmail = await AdminAccount.findOne({
        email: email,
        _id: { $ne: adminAccountId }
      });
      const checkLeaderEmail = await ClubAccount.findOne({
        email: email,
        _id: { $ne: adminAccountId }
      });
      if (checkAdminEmail || checkLeaderEmail) {
        throw new Error(messageVietnamese.ER007('Email'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('campus')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('cơ sở đang làm việc'))
    .bail()
    .custom(async (value: string) => {
      const campusId = value.trim();
      const checkCampusId = await Campus.findById(campusId);
      if (!checkCampusId) {
        throw new Error(messageVietnamese.ER001('cơ sở đang làm việc'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('role')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('loại tài khoản'))
    .bail()
    .custom((value: string) => {
      if (parseInt(value) !== 0 && parseInt(value) !== 1) {
        throw new Error(messageVietnamese.ER001('loại tài khoản'));
      }
    })
    .bail()
    .trim()
];
