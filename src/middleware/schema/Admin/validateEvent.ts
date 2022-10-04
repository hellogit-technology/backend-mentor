// import {check} from 'express-validator'
// import { messageVietnamese } from '../../../utils/message';

// //? CREATE EVENT
// export const eventSchema = [
//     check('')
//         .not()
//         .isEmpty()
//         .withMessage(messageVietnamese.ER001(''))
//         .bail()
//         .custom((value: string) => {
//             return value.trim().length != 0;
//         })
//         .withMessage(messageVietnamese.ER001('tên tài khoản'))
//         .bail()
//         .custom((value: string) => {
//         const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
//         return !regex2Bytes.test(value);
//         })
//         .withMessage(messageVietnamese.ER004)
//         .bail()
//         .custom((value: string) => {
//         const valueLength = value.length;
//         if (valueLength >= 20) {
//             throw new Error(messageVietnamese.ER002A('tên tài khoản', 20, valueLength));
//         }
//         return true;
//         })
// ]
