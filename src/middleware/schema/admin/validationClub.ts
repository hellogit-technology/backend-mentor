import { check } from 'express-validator';
import { messageVietnamese } from '../../../utils/message';
import { Club, Campus } from '../../../app/models';

// CREATE CLUB
export const clubSchema = [
  check('clubName')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('tên câu lạc bộ'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('tên câu lạc bộ'))
    .bail()
    .custom((value: string) => {
      const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
      return !regex2Bytes.test(value);
    })
    .withMessage(messageVietnamese.ER004)
    .bail()
    .custom((value: string) => {
      const valueLength = value.length;
      if (valueLength > 300) {
        throw new Error(messageVietnamese.ER002A('tên câu lạc bộ', 300, valueLength));
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
    .custom((value: string) => {
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
      const checkEmail = await Club.findOne({
        email: email
      });
      if (checkEmail) {
        throw new Error(messageVietnamese.ER007('Email'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('nickname')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('nickname'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('nickname'))
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
        throw new Error(messageVietnamese.ER002A('nickname', 50, valueLength));
      }
      return true;
    })
    .bail()
    .custom(async (value: string, {req}) => {
      const clubId = req.params?.id
      const nickname = value.trim();
      const checkNickname = await Club.findOne({
        nickname: nickname, _id: {$ne: clubId}
      });
      if (checkNickname) {
        throw new Error(messageVietnamese.ER007('Nickname'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('fanpage')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('fanpage'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('fanpage'))
    .bail()
    .custom((value: string) => {
      const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
      return !regex2Bytes.test(value);
    })
    .withMessage(messageVietnamese.ER004)
    .bail()
    .custom((value: string) => {
      const valueLength = value.length;
      if (valueLength > 300) {
        throw new Error(messageVietnamese.ER002A('fanpage', 300, valueLength));
      }
      return true;
    })
    .bail()
    .trim(),
  check('founding')
    .custom((value: string) => {
      const validatePattern = /^(\d{4})(\/|)(\d{1,2})(\/|)(\d{1,2})$/;

      if (value) {
        const dateValues = value.match(validatePattern);

        const checkDate = (inputDate: any) => {
          if (inputDate == null) return false;

          const dtYear = inputDate[1];
          const dtMonth = inputDate[3];
          const dtDay = inputDate[5];

          if (dtMonth < 1 || dtMonth > 12) return false;
          else if (dtDay < 1 || dtDay > 31) return false;
          else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) return false;
          else if (dtMonth == 2) {
            var isleap = dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);
            if (dtDay > 29 || (dtDay == 29 && !isleap)) return false;
          }
          return true;
        };

        if (checkDate(dateValues) === false) {
          throw new Error(messageVietnamese.ER001('ngày thành lập'));
        }
      }
      return true;
    })
    .bail()
    .trim(),
  check('avatar')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error(messageVietnamese.ER001('avatar'));
      }
      return true;
    })
    .bail()
    .custom((value, { req }) => {
      const checkList = ['png, svg, jpg, jpeg, gif, webp'];
      const fileName = req.file.originalname;
      const input = fileName.split('.').pop();
      return checkList.includes(input);
    })
    .withMessage(messageVietnamese.ER009('png, svg, jpg, jpeg, gif, webp'))
    .bail()
    .custom((value, { req }) => {
      const sizeLimit = 5000000; //? 5 MB
      const fileSize = req.file.size;
      return fileSize < sizeLimit;
    })
    .withMessage(messageVietnamese.ER0010('5 MB')),
  check('campus')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('cơ sở'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('cơ sở'))
    .bail()
    .custom(async (value: string) => {
      const campusId = value.trim();
      const checkCampusId = await Campus.findById(campusId);
      if (!checkCampusId) {
        throw new Error(messageVietnamese.ER001('cơ sở'));
      }
      return true;
    })
    .bail()
    .trim(),
];

// UPDATE CLUB
export const clubUpdateSchema = [
  check('clubName')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('tên câu lạc bộ'))
    .bail()
    .custom((value: string) => {
      const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
      return !regex2Bytes.test(value);
    })
    .withMessage(messageVietnamese.ER004)
    .bail()
    .custom((value: string) => {
      const valueLength = value.length;
      if (valueLength > 300) {
        throw new Error(messageVietnamese.ER002A('tên câu lạc bộ', 300, valueLength));
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
    .custom(async (value: string, {req}) => {
      const clubId = req.params?.id
      const email = value.trim();
      const checkEmail = await Club.findOne({
        email: email, _id: {$ne: clubId}
      });
      if (checkEmail) {
        throw new Error(messageVietnamese.ER007('Email'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('nickname')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('nickname'))
    .bail()
    .custom((value) => {
      const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
      return !regex2Bytes.test(value);
    })
    .withMessage(messageVietnamese.ER004)
    .bail()
    .custom((value: string) => {
      const valueLength = value.length;
      if (valueLength > 50) {
        throw new Error(messageVietnamese.ER002A('nickname', 50, valueLength));
      }
      return true;
    })
    .bail()
    .custom(async (value: string, {req}) => {
      const clubId = req.params?.id
      const nickname = value.trim();
      const checkNickname = await Club.findOne({
        nickname: nickname, _id: {$ne: clubId}
      });
      if (checkNickname) {
        throw new Error(messageVietnamese.ER007('Nickname'));
      }
      return true;
    })
    .bail()
    .trim(),
  check('fanpage')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('fanpage'))
    .bail()
    .custom((value: string) => {
      const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
      return !regex2Bytes.test(value);
    })
    .withMessage(messageVietnamese.ER004)
    .bail()
    .custom((value: string) => {
      const valueLength = value.length;
      if (valueLength > 300) {
        throw new Error(messageVietnamese.ER002A('fanpage', 300, valueLength));
      }
      return true;
    })
    .bail()
    .trim(),
  check('founding')
    .custom((value: string) => {
      const validatePattern = /^(\d{4})(\/|)(\d{1,2})(\/|)(\d{1,2})$/;

      if (value) {
        const dateValues = value.match(validatePattern);

        const checkDate = (inputDate: any) => {
          if (inputDate == null) return false;

          const dtYear = inputDate[1];
          const dtMonth = inputDate[3];
          const dtDay = inputDate[5];

          if (dtMonth < 1 || dtMonth > 12) return false;
          else if (dtDay < 1 || dtDay > 31) return false;
          else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) return false;
          else if (dtMonth == 2) {
            var isleap = dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);
            if (dtDay > 29 || (dtDay == 29 && !isleap)) return false;
          }
          return true;
        };

        if (checkDate(dateValues) === false) {
          throw new Error(messageVietnamese.ER001('ngày thành lập'));
        }
      }
      return true;
    })
    .bail()
    .trim(),
  check('avatar')
    .custom((value, { req }) => {
      const checkList = ['png, svg, jpg, jpeg, gif, webp'];
      const fileName = req.file.originalname;
      const input = fileName.split('.').pop();
      return checkList.includes(input);
    })
    .withMessage(messageVietnamese.ER009('png, svg, jpg, jpeg, gif, webp'))
    .bail()
    .custom((value, { req }) => {
      const sizeLimit = 5000000; //? 5 MB
      const fileSize = req.file.size;
      return fileSize < sizeLimit;
    })
    .withMessage(messageVietnamese.ER0010('5 MB')),
  check('campus')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('cơ sở'))
    .bail()
    .custom(async (value: string) => {
      const campusId = value.trim();
      const checkCampusId = await Campus.findById(campusId);
      if (!checkCampusId) {
        throw new Error(messageVietnamese.ER001('cơ sở'));
      }
      return true;
    })
    .bail()
    .trim()
];
