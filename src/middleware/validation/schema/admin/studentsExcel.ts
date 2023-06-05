import { Request, Response, NextFunction } from 'express';
import { Student } from '../../../app/models';
import { importFile } from '../../../utils/handleExcel';
import { messageVietnamese } from '../../../utils/message';
import { printErrorLog } from '../../../utils/makeUp';
import { exportPDF } from '../../../utils/handlePDF';

type FormatTitle = string[];
type DataError = string[];

interface StudentInfo {
  MSSV: string;
  'Họ tên': string;
  Ngành: string;
  'Email trường': string;
}

class MethodExcel {
  /**
   * @constant title Format title permission
   * @constant schoolIdBase Format school ID by regions
   */

  private static readonly title: FormatTitle = ['MSSV', 'Họ tên', 'Ngành', 'Email trường'];
  private static readonly schoolIdBase = {
    'Hồ Chí Minh': {
      BTEC: {
        IT: 'GCS',
        BIZ: 'GBS',
        GD: 'GDS',
        ALL: ['GCS', 'GBS', 'GDS']
      },
      TOPUP: {
        IT: 'TCS',
        BIZ: 'TBS',
        GD: 'TDS',
        ALL: ['TCS', 'TBS', 'TDS']
      }
    },
    'Hà Nội': {
      BTEC: {
        IT: 'GCH',
        BIZ: 'GBH',
        GD: 'GDH'
      },
      TOPUP: {
        IT: 'TCH',
        BIZ: 'TBH',
        GD: 'TDH'
      }
    },
    'Cần Thơ': {
      BTEC: {
        IT: 'GCC',
        BIZ: 'GBC',
        GD: 'GDC'
      },
      TOPUP: {
        IT: 'TCC',
        BIZ: 'TBC',
        GD: 'TDC'
      }
    },
    'Đà Nẵng': {
      BTEC: {
        IT: 'GCD',
        BIZ: 'GBD',
        GD: 'GDD'
      },
      TOPUP: {
        IT: 'TCD',
        Biz: 'TBD',
        GD: 'TDD'
      }
    }
  };

  /**
   * @function validateStudentsData Validation middleware
   * @param req Get req.file!.buffer (Excel file as buffer)
   * @param next Pass next() if data is valid
   */

  public validateStudentsData = (req: Request, res: Response, next: NextFunction) => {
    try {
      const responseErrorMessage: string[] = [];
      const file: Buffer = req.file!.buffer;
      const resultData = importFile(file);

      // Check header
      const checkResultHeader = this.isValidHeader(resultData[0]);
      if (typeof checkResultHeader !== 'boolean') {
        responseErrorMessage.push(...checkResultHeader);

        // Handle Error
        return exportPDF(responseErrorMessage, res);
      }

      // Check body
      resultData.forEach((item, index) => {
        let formatIndexExcel = index + 2;

        // Check length of data
        if (!this.isGoodStudentData(item)) {
          responseErrorMessage.push(`Dòng ${formatIndexExcel}: ${messageVietnamese.XLS002(MethodExcel.title.length)}`);
          return;
        }

        // Check schoolId format
        const checkResultSchoolId = this.isValidSchoolId(item['MSSV'], formatIndexExcel);
        if (typeof checkResultSchoolId !== 'boolean') {
          responseErrorMessage.push(...checkResultSchoolId);
        }

        // Check fullname format
        const checkResultFullName = this.isValidFullName(item['Họ tên'], formatIndexExcel);
        if (typeof checkResultFullName !== 'boolean') {
          responseErrorMessage.push(...checkResultFullName);
        }

        // Check email format
        const checkResultEmail = this.isValidEmail(item['Email trường'], formatIndexExcel);
        if (typeof checkResultEmail !== 'boolean') {
          responseErrorMessage.push(...checkResultEmail);
        }
      });

      // Return error if have
      if (responseErrorMessage.length > 0) {
        // Handle Error
        return exportPDF(responseErrorMessage, res);
      }

      // Check duplicate input data
      const allInputSchoolId = resultData.map((item) => {
        if (this.isGoodStudentData(item)) {
          return item['MSSV'].trim();
        }
      });
      const allInputEmail = resultData.map((item) => {
        if (this.isGoodStudentData(item)) {
          return item['Email trường'].trim().toLocaleLowerCase();
        }
      });
      resultData.forEach((item, index) => {
        let formatIndexExcel = index + 2;
        const schoolIdArray = allInputSchoolId as string[];
        const emailArray = allInputEmail as string[];
        if (this.isGoodStudentData(item)) {
          let duplicateSchoolIdValue = schoolIdArray.filter((element) => element === item['MSSV']);
          let duplicateEmailValue = emailArray.filter((element) => element === item['Email trường']);
          if (duplicateSchoolIdValue.length > 1) {
            responseErrorMessage.push(`Dòng ${formatIndexExcel}: ${messageVietnamese.XLS006('MSSV')}`);
          }
          if (duplicateEmailValue.length > 1) {
            responseErrorMessage.push(`Dòng ${formatIndexExcel}: ${messageVietnamese.XLS006('Email trường')}`);
          }
        }
      });

      // Return error
      if (responseErrorMessage.length > 0) {
        // Handle Error
        return exportPDF(responseErrorMessage, res);
      }
      return next();
    } catch (error) {
      printErrorLog(error);
    }
  };

  /**
   * @function isValidHeader Check length and format data header
   * @param data Get data (unknown object)
   * @constant dataError string[]
   * @returns true/dataError
   */

  private isValidHeader = (data: unknown): boolean | DataError => {
    const dataError: string[] = [];
    if (this.isGoodStudentData(data)) {
      dataError.push(`Dòng 1: ${messageVietnamese.XLS001('MSSV, Họ tên, Ngành, Email trường')}`);
    }
    if (dataError.length > 0) return dataError;
    return true;
  };

  /**
   * @function isGoodStudentData Check uknown object has 4 keys ('MSSV', 'Họ tên', 'Ngành', 'Email trường')
   * @param object uknown object
   * @returns true/false
   */

  private isGoodStudentData = (object: unknown): object is StudentInfo => {
    const schoolIdCheck = MethodExcel.title[0];
    const fullNameScheck = MethodExcel.title[1];
    const majorsCheck = MethodExcel.title[2];
    const emailCheck = MethodExcel.title[3];
    if (object !== null && typeof object === 'object') {
      return schoolIdCheck in object && fullNameScheck in object && majorsCheck in object && emailCheck in object;
    }
    return false;
  };

  /**
   * @function check2Bytes Check format data
   * @param data string
   * @returns true/false
   */

  private check2Bytes = (data: string): boolean => {
    const regex2Bytes = /[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
    return !regex2Bytes.test(data);
  };

  /**
   * @function maxLength Check length data
   * @param data string
   * @returns true/false
   */

  private maxLength = (data: string, max: number) => {
    return data.length === max;
  };

  /**
   * @function isEmail Check format email
   * @param data string
   * @returns true/false
   */

  private isEmail = (data: string) => {
    const regex =
      /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return regex.test(data);
  };

  /**
   * @function sanitize Prevent NoSQL injection
   * @param query Query filter mongo
   * @returns filterd object
   */

  private sanitize = (query: unknown) => {
    if (query instanceof Object) {
      for (let key in query) {
        if (/^\$/.test(key)) {
          delete query[key as keyof typeof query];
        } else {
          this.sanitize(query[key as keyof typeof query]);
        }
      }
    }
    return query;
  };

  /**
   * @function checkDataIsExist Check schoolId or email
   * @param data string
   * @param option query options
   * @returns true/false
   */

  private checkDataIsExist = async (data: string, option: 'schoolId' | 'email'): Promise<boolean> => {
    try {
      if (option === 'schoolId') {
        const schoolIdResult = await Student.findOne({ schoolId: this.sanitize(data) });
        if (schoolIdResult) return true;
        return false;
      }
      if (option === 'email') {
        const emailResult = await Student.findOne({ email: this.sanitize(data) });
        if (emailResult) return true;
        return false;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  /**
   * @function isValidSchoolId Check format school ID
   * @param schoolId string
   * @returns true/DataError
   * @example Hồ Chí Minh
   */

  private isValidSchoolId = (schoolId: string, index: number): boolean | DataError => {
    const maxLength = 15;
    const schooldIdErrorMessage: string[] = [];
    const checkListSchoolIdBTEC = MethodExcel.schoolIdBase['Hồ Chí Minh'].BTEC.ALL;
    const checkListSchoolIdTOPUP = MethodExcel.schoolIdBase['Hồ Chí Minh'].TOPUP.ALL;
    const checkListSchoolId: string[] = checkListSchoolIdBTEC.concat(checkListSchoolIdTOPUP);
    if (!this.check2Bytes(schoolId)) {
      schooldIdErrorMessage.push(`Dòng ${index}: ${messageVietnamese.XLS004('MSSV')}`);
    }
    if (!checkListSchoolId.includes(schoolId)) {
      schooldIdErrorMessage.push(`Dòng ${index}: ${messageVietnamese.XLS007('MSSV')}`);
    }
    if (!this.maxLength(schoolId, maxLength)) {
      schooldIdErrorMessage.push(`Dòng ${index}: ${messageVietnamese.XLS003('MSSV', maxLength, schoolId.length)}`);
    }
    if (!this.checkDataIsExist(schoolId, 'schoolId')) {
      schooldIdErrorMessage.push(`Dòng ${index}: ${messageVietnamese.XLS005('MSSV')}`);
    }
    if (schooldIdErrorMessage.length > 0) return schooldIdErrorMessage;
    return true;
  };

  /**
   * @function isValidFullName Check format fullname
   * @param fullname string
   * @returns true/DataError
   */

  private isValidFullName = (fullname: string, index: number): boolean | DataError => {
    const maxLength = 30;
    const fullNameErrorMessage: string[] = [];
    if (!this.check2Bytes(fullname)) {
      fullNameErrorMessage.push(`Dòng ${index}: ${messageVietnamese.XLS004('Họ tên')}`);
    }
    if (!this.maxLength(fullname, maxLength)) {
      fullNameErrorMessage.push(`Dòng ${index}: ${messageVietnamese.XLS003('Họ tên', maxLength, fullname.length)}`);
    }
    if (fullNameErrorMessage.length > 0) return fullNameErrorMessage;
    return true;
  };

  /**
   * @function isValidEmail Check format email
   * @param email string
   * @returns true/DataError
   */

  private isValidEmail = (email: string, index: number): boolean | DataError => {
    const maxLength = 100;
    const formatEmail = email.toLocaleLowerCase();
    const emailErrorMessage: string[] = [];
    if (!this.isEmail(formatEmail)) {
      emailErrorMessage.push(`Dòng ${index}: ${messageVietnamese.XLS007('Email trường')}`);
    }
    if (!this.maxLength(formatEmail, maxLength)) {
      emailErrorMessage.push(`Dòng ${index}: ${messageVietnamese.XLS003('Email trường', maxLength, formatEmail.length)}`);
    }
    if (!this.checkDataIsExist(formatEmail, 'email')) {
      emailErrorMessage.push(`Dòng ${index}: ${messageVietnamese.XLS005('Email trường')}`);
    }
    if (emailErrorMessage.length > 0) return emailErrorMessage;
    return true;
  };
}

export default new MethodExcel();
