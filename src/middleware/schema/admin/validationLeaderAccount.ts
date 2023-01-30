import { check } from 'express-validator';
import { messageVietnamese } from '../../../utils/message';
import { AdminAccount, Campus, LeaderAccount, Club, Student } from '../../../app/models';

// CREATE LEADER ACCOUNT
export const leaderSchema = [
  check('email')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('email'))
    .bail()
    .custom((value: string) => {
      return value.trim().length != 0;
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
      const checkLeaderEmail = await LeaderAccount.findOne({
        email: email
      });
      if (checkAdminEmail || checkLeaderEmail) {
        throw new Error(messageVietnamese.ER007('Email'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('club')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('câu lạc bộ'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('câu lạc bộ'))
    .bail()
    .custom(async (value: string) => {
      const clubId = value.trim();
      const checkClubId = await Club.findById(clubId);
      if (!checkClubId) {
        throw new Error(messageVietnamese.ER001('câu lạc bộ'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('fullname')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('họ tên leader'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('họ tên leader'))
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
        throw new Error(messageVietnamese.ER002A('họ tên leader', 50, valueLength));
      }
      return true;
    })
    .bail()
    .trim(),
  check('schoolId')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('mã số sinh viên'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('mã số sinh viên'))
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
        throw new Error(messageVietnamese.ER002A('mã số sinh viên', 30, valueLength));
      }
      return true;
    })
    .bail()
    .custom(async (value: string) => {
      const schoolId = value.trim();
      const checkSchoolId = await Student.findOne({
        schoolId: schoolId
      });
      if (checkSchoolId) {
        throw new Error(messageVietnamese.ER007('Mã số sinh viên'));
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

// UPDATE LEADER ACCOUNT
export const leaderUpdateSchema = [
  check('email')
    .custom((value: string) => {
      return value.trim().length != 0;
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
    .custom(async (value: string, {req}) => {
      const leaderAccountId = req.param?.id
      const email = value.trim();
      const checkAdminEmail = await LeaderAccount.findOne({
        email: email, _id: { $ne: leaderAccountId }
      });
      const checkLeaderEmail = await LeaderAccount.findOne({
        email: email, _id: { $ne: leaderAccountId }
      });
      if (checkAdminEmail || checkLeaderEmail) {
        throw new Error(messageVietnamese.ER007('Email'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('club')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('câu lạc bộ'))
    .bail()
    .custom(async (value: string) => {
      const clubId = value.trim();
      const checkClubId = await Club.findById(clubId);
      if (!checkClubId) {
        throw new Error(messageVietnamese.ER001('câu lạc bộ'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('fullname')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('họ tên leader'))
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
        throw new Error(messageVietnamese.ER002A('họ tên leader', 50, valueLength));
      }
      return true;
    })
    .bail()
    .trim(),
  check('schoolId')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('mã số sinh viên'))
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
        throw new Error(messageVietnamese.ER002A('mã số sinh viên', 30, valueLength));
      }
      return true;
    })
    .bail()
    .custom(async (value: string, {req}) => {
      const leaderAccountId = req.params?.id
      const schoolId = value.trim();
      const checkSchoolId = await Student.findOne({
        schoolId: schoolId, _id: { $ne: leaderAccountId }
      });
      if (checkSchoolId) {
        throw new Error(messageVietnamese.ER007('Mã số sinh viên'));
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
