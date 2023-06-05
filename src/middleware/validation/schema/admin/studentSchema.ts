import { check } from 'express-validator';
import { messageVietnamese } from '../../../utils/message';
import { Campus, Student } from '../../../app/models';

// CREATE STUDENT
export const studentSchema = [
  check('schoolId')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('ID'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('ID'))
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
        throw new Error(messageVietnamese.ER002A('ID', 30, valueLength));
      }
      return true;
    })
    .bail()
    .custom(async (value: string) => {
      const schoolId = value.trim();
      const checkUsername = await Student.findOne({
        schoolId: schoolId
      });
      if (checkUsername) {
        throw new Error(messageVietnamese.ER007('ID'));
      }
      return true;
    })
    .bail()
    .trim(),
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
      if (valueLength > 50) {
        throw new Error(messageVietnamese.ER002A('họ và tên', 50, valueLength));
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
      const email = value.trim();
      const checkEmail = await Student.findOne({
        email: email
      });
      if (checkEmail) {
        throw new Error(messageVietnamese.ER007('Email'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('campus')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('cơ sở đang học'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('cơ sở đang học'))
    .bail()
    .custom(async (value: string) => {
      const campusId = value.trim();
      const checkCampusId = await Campus.findById(campusId);
      if (!checkCampusId) {
        throw new Error(messageVietnamese.ER001('cơ sở đang học'));
      }
      return true;
    })
    .bail()
    .trim()
];

// UPDATE STUDENT
export const studentUpdateSchema = [
  check('schoolId')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('ID'))
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
        throw new Error(messageVietnamese.ER002A('ID', 30, valueLength));
      }
      return true;
    })
    .bail()
    .custom(async (value: string, { req }) => {
      const studentId = req.params?.id;
      const schoolId = value.trim();
      const checkUsername = await Student.findOne({
        schoolId: schoolId,
        _id: { $ne: studentId }
      });
      if (checkUsername) {
        throw new Error(messageVietnamese.ER007('ID'));
      }
      return true;
    })
    .bail()
    .trim(),
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
      const studentId = req.params?.id;
      const email = value.trim();
      const checkEmail = await Student.findOne({
        email: email,
        _id: { $ne: studentId }
      });
      if (checkEmail) {
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
    .withMessage(messageVietnamese.ER001('cơ sở đang học'))
    .bail()
    .custom(async (value: string) => {
      const campusId = value.trim();
      const checkCampusId = await Campus.findById(campusId);
      if (!checkCampusId) {
        throw new Error(messageVietnamese.ER001('cơ sở đang học'));
      }
      return true;
    })
    .bail()
    .trim()
];
