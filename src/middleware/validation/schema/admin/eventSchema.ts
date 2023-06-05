import { check } from 'express-validator';
import { messageVietnamese } from '../../../utils/message';
import { Club, Campus } from '../../../app/models';

// CREATE EVENT
export const eventSchema = [
  check('eventName')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('tên sự kiện'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('tên sự kiện'))
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
        throw new Error(messageVietnamese.ER002A('tên sự kiện', 300, valueLength));
      }
      return true;
    })
    .bail()
    .trim(),
  check('poster')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error(messageVietnamese.ER001('poster sự kiện'));
      }
    })
    .custom((value, { req }) => {
      const checkList = ['png, jpg, jpeg'];
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
  check('date')
    .notEmpty()
    .withMessage(messageVietnamese.ER001('ngày diễn ra'))
    .bail()
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('ngày diễn ra'))
    .bail()
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
          throw new Error(messageVietnamese.ER001('ngày diễn ra'));
        }
      }
      return true;
    })
    .bail()
    .trim(),
  check('club')
    .custom((value: string[], { req }) => {
      const result = value.reduce<number[]>((accurate, current, index) => {
        if (current === '' || current === undefined) accurate.push(index);
        return accurate;
      }, []);
      if (result.length > 0) {
        req.session.inputShowEvent = result;
        throw new Error(messageVietnamese.ER001('đồng tổ chức'));
      }
      return true;
    })
    .custom(async (value: string[], { req }) => {
      const clubs: string[] = await Club.find({}, '_id');
      const result = value.reduce<number[]>((accurate, current, index) => {
        if (clubs.includes(current)) accurate.push(index);
        return accurate;
      }, []);
      if (result.length > 0) {
        req.session.inputShowEvent = result;
        throw new Error(messageVietnamese.ER001('đồng tổ chức'));
      }
      return true;
    }),
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
    .trim()
];

// UPDATE EVENT
export const eventUpdateSchema = [
  check('eventName')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('tên sự kiện'))
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
        throw new Error(messageVietnamese.ER002A('tên sự kiện', 300, valueLength));
      }
      return true;
    })
    .bail()
    .trim(),
  check('poster')
    .custom((value, { req }) => {
      const checkList = ['png, jpg, jpeg'];
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
  check('date')
    .custom((value: string) => {
      return value.trim().length !== 0;
    })
    .withMessage(messageVietnamese.ER001('ngày diễn ra'))
    .bail()
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
          throw new Error(messageVietnamese.ER001('ngày diễn ra'));
        }
      }
      return true;
    })
    .bail()
    .trim(),
  check('club')
    .custom((value: string[], { req }) => {
      const result = value.reduce<number[]>((accurate, current, index) => {
        if (current === '' || current === undefined) accurate.push(index);
        return accurate;
      }, []);
      if (result.length > 0) {
        req.session.inputShowEvent = result;
        throw new Error(messageVietnamese.ER001('đồng tổ chức'));
      }
      return true;
    })
    .custom(async (value: string[], { req }) => {
      const clubs: string[] = await Club.find({}, '_id');
      const result = value.reduce<number[]>((accurate, current, index) => {
        if (clubs.includes(current)) accurate.push(index);
        return accurate;
      }, []);
      if (result.length > 0) {
        req.session.inputShowEvent = result;
        throw new Error(messageVietnamese.ER001('đồng tổ chức'));
      }
      return true;
    }),
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
