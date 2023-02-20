import {Request, Response, NextFunction} from 'express'
import { Student } from '../../../app/models'
import {importFile} from '../../../utils/handleExcel'
import {messageVietnamese} from '../../../utils/message'

type FormatData = {[key: string]: string}
type FormatTitle = string[]
type DataError = string[]

interface StudentInfo {
    'MSSV': string,
    'Họ tên': string,
    'Ngành': string,
    'Email trường': string
} 

class MethodExcel {

    /**
     * @constant title Format title permission
     * @constant schoolIdBase Format school ID by regions
     */

    private static readonly title: FormatTitle = ['MSSV', 'Họ tên', 'Ngành', 'Email trường']
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
    }

    /**
     * @function validateStudentsData Validation middleware 
     * @param req Get req.file!.buffer (Excel file as buffer)
     * @param next Pass next() if data is valid
     */

    public validateStudentsData(req: Request, res: Response, next: NextFunction){
        try {
            const responseErrorMessage: string[] = []
            const file: Buffer = req.file!.buffer
            const resultData = importFile(file)

            // Check header
            const checkResultHeader = this.isValidHeader(resultData[0])
            if(typeof checkResultHeader !== 'boolean') {
                responseErrorMessage.push(...checkResultHeader)

                // Handle Error
            }

            // Check body
            resultData.forEach((item, index) => {
                if(!this.isGoodStudentData(item)) {
                    responseErrorMessage.push(`Dòng ${index + 2}: ${messageVietnamese.XLS002(MethodExcel.title.length)}`)
                    return;
                }

                
            })
        } catch (error) {
            
        }
    } 

    /**
     * @function isGoodStudentData Check uknown object has 4 keys ('MSSV', 'Họ tên', 'Ngành', 'Email trường')
     * @param object uknown object 
     * @returns true/false 
     */

    private isGoodStudentData(object: unknown): object is StudentInfo {
        const schoolIdCheck = MethodExcel.title[0]
        const fullNameScheck = MethodExcel.title[1]
        const majorsCheck = MethodExcel.title[2]
        const emailCheck = MethodExcel.title[3]
        if(object !== null && typeof object === 'object') {
            return schoolIdCheck in object && fullNameScheck in object && majorsCheck in object && emailCheck in object
        }
        return false
    }

    /**
     * @function isValidHeader Check length and format data header
     * @param data Get data (unknown object)
     * @constant dataError string[]
     * @returns true/dataError 
     */

    private isValidHeader(data: unknown): boolean | DataError {
        const dataError: string[] = []
        if(this.isGoodStudentData(data)) {
            dataError.push(`Dòng 1: ${messageVietnamese.XLS001('MSSV, Họ tên, Ngành, Email trường')}`)
        }
        if(dataError.length > 0) return dataError
        return true
    }

    /**
     * @function isValidSchoolId Check format school ID
     * @param data Get data from excel file
     * @returns true/false
     */

    private isValidSchoolId(data: FormatData): boolean {
        try {
            const checkListSchoolIdBTEC = MethodExcel.schoolIdBase['Hồ Chí Minh'].BTEC.ALL
            const checkListSchoolIdTOPUP = MethodExcel.schoolIdBase['Hồ Chí Minh'].TOPUP.ALL
            const checkListSchoolId: string[] = checkListSchoolIdBTEC.concat(checkListSchoolIdTOPUP)
            data.forEach(item => {
                if(!checkListSchoolId.includes(item['MSSV'])) return false
            })
            return true
        } catch (error) {
            return false
        }
    }

    /**
     * @function checkDataIsExist Check student ID is exist
     * @param data Get data from excel file
     */

    private async checkDataIsExist(data: CheckedFormatData): boolean {
        try {
            const start = performance.now()
            const promiseSchoolIdArray: unknown[] = [];
            const promiseEmailArray: unknown[] = []
            data.forEach(item => {
                promiseSchoolIdArray.push(Student.findOne({schoolId: item['MSSV']}))
                promiseEmailArray.push(Student.findOne({email: item['Email trường']}))
            });
            const [resultSchoolId, resultEmail] = await Promise.all([Promise.all(promiseSchoolIdArray), Promise.all(promiseEmailArray)])
            const [] = await Promise.all([
                new Promise((resolve, reject) => {
                  resultSchoolId.forEach((item, index) => {
                    
                  });
                }),
                new Promise((resolve, reject) => {
                  resultEmail.forEach((item, index) => {
                   
                  });
                  
                })
              ]);

            const end = performance.now()
            console.log(`Time taken: ${end - start} ms`)
        } catch (error) {
            return false
        }
    }

    
}

export default new MethodExcel