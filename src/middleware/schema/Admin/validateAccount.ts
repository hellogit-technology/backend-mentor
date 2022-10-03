// import { check } from 'express-validator';
// import { messageVietnamese } from '../../../utils/message';

// //? CREATE MENTOR ACCOUNT
// export const mentorSchema = [
//   check('username')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('tên tài khoản'))
//     .bail()
//     .custom((value: string) => {
//       return value.trim().length != 0;
//     })
//     .withMessage(messageVietnamese.ER001('tên tài khoản'))
//     .bail()
//     .custom((value: string) => {
//       const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
//       return !regex2Bytes.test(value);
//     })
//     .withMessage(messageVietnamese.ER004)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 20) {
//         throw new Error(messageVietnamese.ER002A('tên tài khoản', 20, valueLength));
//       }
//       return true;
//     })
//     .bail()
//     .custom(async (value: string) => {
//       const username = value.trim();
//       const checkUsername = await Account.findOne({
//         username: username
//       });
//       if (checkUsername) {
//         throw new Error(messageVietnamese.ER007('Tên tài khoản'));
//       }
//       return true;
//     })
//     .bail()
//     .isLowercase()
//     .withMessage(messageVietnamese.ER008)
//     .trim(),
//   check('password')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('mật khẩu'))
//     .bail()
//     .custom((value: string) => {
//       return value.trim().length != 0;
//     })
//     .withMessage(messageVietnamese.ER005)
//     .bail()
//     .custom((value: string) => {
//       const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
//       return !regex2Bytes.test(value);
//     })
//     .withMessage(messageVietnamese.ER004)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 50) {
//         throw new Error(messageVietnamese.ER002A('mật khẩu', 50, valueLength));
//       }
//       return true;
//     }),
//   check('cPassword')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('xác nhận mật khẩu'))
//     .bail()
//     .custom((value: string, { req }) => {
//       const password = req.body.password;
//       if (value !== password) {
//         throw new Error(messageVietnamese.ER006);
//       }
//       return true;
//     }),
//   check('email')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('email'))
//     .bail()
//     .custom((value: string) => {
//       const regex =
//         /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
//       return regex.test(value);
//     })
//     .withMessage(messageVietnamese.ER003)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 100) {
//         throw new Error(messageVietnamese.ER002A('email', 100, valueLength));
//       }
//       return true;
//     })
//     .bail()
//     .custom(async (value: string) => {
//       const email = value.trim();
//       const checkEmail = await Account.findOne({
//         email: email
//       });
//       if (checkEmail) {
//         throw new Error(messageVietnamese.ER007('Email'));
//       }
//       return true;
//     }),
//   check('campus').not().isEmpty().withMessage(messageVietnamese.ER001('cơ sở'))
// ];

// //? UPDATE MENTOR ACCOUNT
// export const mentorUpdateSchema = [
//   check('username')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('tên tài khoản'))
//     .bail()
//     .custom((value: string) => {
//       return value.trim().length != 0;
//     })
//     .withMessage(messageVietnamese.ER001('tên tài khoản'))
//     .bail()
//     .custom((value: string) => {
//       const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
//       return !regex2Bytes.test(value);
//     })
//     .withMessage(messageVietnamese.ER004)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 20) {
//         throw new Error(messageVietnamese.ER002A('tên tài khoản', 20, valueLength));
//       }
//       return true;
//     })
//     .bail()
//     .custom(async (value: string) => {
//       const username = value.trim();
//       const checkUsername = await Account.findOne({
//         username: username
//       });
//       if (checkUsername) {
//         throw new Error(messageVietnamese.ER007('Tên tài khoản'));
//       }
//       return true;
//     })
//     .bail()
//     .isLowercase()
//     .withMessage(messageVietnamese.ER008)
//     .trim(),
//   check('password')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('mật khẩu'))
//     .bail()
//     .custom((value: string) => {
//       return value.trim().length != 0;
//     })
//     .withMessage(messageVietnamese.ER005)
//     .bail()
//     .custom((value: string) => {
//       const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
//       return !regex2Bytes.test(value);
//     })
//     .withMessage(messageVietnamese.ER004)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 50) {
//         throw new Error(messageVietnamese.ER002A('mật khẩu', 50, valueLength));
//       }
//       return true;
//     }),
//   check('cPassword')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('xác nhận mật khẩu'))
//     .bail()
//     .custom((value: string, { req }) => {
//       const password = req.body.password;
//       if (value !== password) {
//         throw new Error(messageVietnamese.ER006);
//       }
//       return true;
//     }),
//   check('email')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('email'))
//     .bail()
//     .custom((value: string) => {
//       const regex =
//         /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
//       return regex.test(value);
//     })
//     .withMessage(messageVietnamese.ER003)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 100) {
//         throw new Error(messageVietnamese.ER002A('email', 100, valueLength));
//       }
//       return true;
//     })
//     .bail()
//     .custom(async (value: string) => {
//       const email = value.trim();
//       const checkEmail = await Account.findOne({
//         email: email
//       });
//       if (checkEmail) {
//         throw new Error(messageVietnamese.ER007('Email'));
//       }
//       return true;
//     }),
//   check('campus').not().isEmpty().withMessage(messageVietnamese.ER001('cơ sở'))
// ];

// //? CREATE LEADER ACCOUNT
// export const leaderSchema = [
//   check('username')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('tên tài khoản'))
//     .bail()
//     .custom((value: string) => {
//       return value.trim().length != 0;
//     })
//     .withMessage(messageVietnamese.ER001('tên tài khoản'))
//     .bail()
//     .custom((value: string) => {
//       const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
//       return !regex2Bytes.test(value);
//     })
//     .withMessage(messageVietnamese.ER004)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 20) {
//         throw new Error(messageVietnamese.ER002A('tên tài khoản', 20, valueLength));
//       }
//       return true;
//     })
//     .bail()
//     .custom(async (value: string) => {
//       const username = value.trim();
//       const checkUsername = await Account.findOne({
//         username: username
//       });
//       if (checkUsername) {
//         throw new Error(messageVietnamese.ER007('Tên tài khoản'));
//       }
//       return true;
//     })
//     .bail()
//     .isLowercase()
//     .withMessage(messageVietnamese.ER008)
//     .trim(),
//   check('password')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('mật khẩu'))
//     .bail()
//     .custom((value: string) => {
//       return value.trim().length != 0;
//     })
//     .withMessage(messageVietnamese.ER005)
//     .bail()
//     .custom((value: string) => {
//       const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
//       return !regex2Bytes.test(value);
//     })
//     .withMessage(messageVietnamese.ER004)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 50) {
//         throw new Error(messageVietnamese.ER002A('mật khẩu', 50, valueLength));
//       }
//       return true;
//     }),
//   check('cPassword')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('xác nhận mật khẩu'))
//     .bail()
//     .custom((value: string, { req }) => {
//       const password = req.body.password;
//       if (value !== password) {
//         throw new Error(messageVietnamese.ER006);
//       }
//       return true;
//     }),
//   check('email')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('email'))
//     .bail()
//     .custom((value: string) => {
//       const regex =
//         /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
//       return regex.test(value);
//     })
//     .withMessage(messageVietnamese.ER003)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 100) {
//         throw new Error(messageVietnamese.ER002A('email', 100, valueLength));
//       }
//       return true;
//     })
//     .bail()
//     .custom(async (value: string) => {
//       const email = value.trim();
//       const checkEmail = await Account.findOne({
//         email: email
//       });
//       if (checkEmail) {
//         throw new Error(messageVietnamese.ER007('Email'));
//       }
//       return true;
//     }),
//   check('campus').not().isEmpty().withMessage(messageVietnamese.ER001('cơ sở')),
//   check('club').not().isEmpty().withMessage(messageVietnamese.ER001('câu lạc bộ'))
// ];

// //? UPDATE LEADER ACCOUNT
// export const leaderUpdateSchema = [
//   check('username')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('tên tài khoản'))
//     .bail()
//     .custom((value: string) => {
//       return value.trim().length != 0;
//     })
//     .withMessage(messageVietnamese.ER001('tên tài khoản'))
//     .bail()
//     .custom((value: string) => {
//       const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
//       return !regex2Bytes.test(value);
//     })
//     .withMessage(messageVietnamese.ER004)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 20) {
//         throw new Error(messageVietnamese.ER002A('tên tài khoản', 20, valueLength));
//       }
//       return true;
//     })
//     .bail()
//     .custom(async (value: string) => {
//       const username = value.trim();
//       const checkUsername = await Account.findOne({
//         username: username
//       });
//       if (checkUsername) {
//         throw new Error(messageVietnamese.ER007('Tên tài khoản'));
//       }
//       return true;
//     })
//     .bail()
//     .isLowercase()
//     .withMessage(messageVietnamese.ER008),
//   check('password')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('mật khẩu'))
//     .bail()
//     .custom((value: string) => {
//       return value.trim().length != 0;
//     })
//     .withMessage(messageVietnamese.ER005)
//     .bail()
//     .custom((value: string) => {
//       const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
//       return !regex2Bytes.test(value);
//     })
//     .withMessage(messageVietnamese.ER004)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 50) {
//         throw new Error(messageVietnamese.ER002A('mật khẩu', 50, valueLength));
//       }
//       return true;
//     }),
//   check('cPassword')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('xác nhận mật khẩu'))
//     .bail()
//     .custom((value: string, { req }) => {
//       const password = req.body.password;
//       if (value !== password) {
//         throw new Error(messageVietnamese.ER006);
//       }
//       return true;
//     }),
//   check('email')
//     .not()
//     .isEmpty()
//     .withMessage(messageVietnamese.ER001('email'))
//     .bail()
//     .custom((value: string) => {
//       const regex =
//         /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
//       return regex.test(value);
//     })
//     .withMessage(messageVietnamese.ER003)
//     .bail()
//     .custom((value: string) => {
//       const valueLength = value.length;
//       if (valueLength >= 100) {
//         throw new Error(messageVietnamese.ER002A('email', 100, valueLength));
//       }
//       return true;
//     })
//     .bail()
//     .custom(async (value: string) => {
//       const email = value.trim();
//       const checkEmail = await Account.findOne({
//         email: email
//       });
//       if (checkEmail) {
//         throw new Error(messageVietnamese.ER007('Email'));
//       }
//       return true;
//     }),
//   check('campus').not().isEmpty().withMessage(messageVietnamese.ER001('cơ sở')),
//   check('club').not().isEmpty().withMessage(messageVietnamese.ER001('câu lạc bộ'))
// ];
