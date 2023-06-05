import { Request, Response } from 'express';
import { Student } from '../../../models';
import { IStudent } from '../../../../interface/IStudent';
import { IPagination } from '../../../../interface/IPagination';
import { messageVietnamese } from '../../../../utils/message';
import { IAccountSession } from '../../../../interface/ISession';
import { importFile } from '../../../../utils/handleExcel';

class StudentControllers {
  private CREATE_SUCCESS = messageVietnamese.RES004B('sinh viên');
  private CREATE_FAILED = messageVietnamese.RES004A('sinh viên');
  private UPDATE_SUCCESS = messageVietnamese.RES002B('sinh viên');
  private UPDATE_FAILED = messageVietnamese.RES002A('sinh viên');
  private DELETE_SUCCESS = messageVietnamese.RES003B('sinh viên');
  private DELETE_FAILED = messageVietnamese.RES003A('sinh viên');

  private responseMessage = (statusCode: number, message: string) => (req: Request, res: Response) => {
    return res.status(statusCode).json({
      status: statusCode,
      message: message
    });
  };

  public pagination = async(page: number, search?: string, limitItem = 15): Promise<IPagination> => {
    const regex = search ? new RegExp(`.*${search}.*`, 'i') : null;
    const searchCondition = regex ? { $or: [{ fullname: regex }, { email: regex }] } : {};
    const [studentsResult, totalItems] = await Promise.all([
      Student.find(searchCondition)
      .populate('campus')
      .populate('club')
      .populate('editor')
      .limit(limitItem)
      .skip(page * limitItem - limitItem),
      Student.countDocuments(searchCondition)
    ])
    return {
      data: studentsResult,
      current: page,
      pages: Math.ceil(totalItems / limitItem)
    }
  }

  // Create a student
  public createStudent = async (req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const { fullname, schoolId, email, campus } = req.body;
      const newStudent = new Student<IStudent>({
        fullname: fullname as string,
        schoolId: schoolId as string,
        email: email as string,
        campus: campus as string,
        editor: accountSession['userId'] as string
      });
      await newStudent.save();
      return this.responseMessage(200, this.CREATE_SUCCESS);
    } catch (error) {
      this.responseMessage(500, this.CREATE_FAILED);
    }
  };

  // Create many student (import excel file)
  public uploadStudents = async (req: Request, res: Response) => {
    try {
      importFile(req.file!.buffer);
      res.end();
    } catch (error) {
      console.error(error);
    }
  };

  // Update a student
  public updateStudent = async (req: Request, res: Response) => {
    try {
      const studentId = req.params.id;
      const accountSession: IAccountSession = req.user!;
      const { fullname, schoolId, email, campus } = req.body;
      const result = await Student.findByIdAndUpdate(studentId, {
        $set: {
          editor: accountSession['userId'] as string,
          ...(schoolId && { schoolId }),
          ...(email && { email }),
          ...(campus && { campus }),
          ...(fullname && { fullname })
        } as IStudent
      });
      if (!result) return this.responseMessage(404, this.UPDATE_FAILED);
      return this.responseMessage(200, this.UPDATE_SUCCESS);
    } catch (error) {
      this.responseMessage(500, this.UPDATE_FAILED);
    }
  };

  // Delete student
  public deleteStudent = async (req: Request, res: Response) => {
    try {
      const studentId = req.params.id;
      const result = await Student.findByIdAndDelete(studentId);
      if (!result) return this.responseMessage(404, this.DELETE_FAILED);
      return this.responseMessage(200, this.DELETE_SUCCESS);
    } catch (error) {
      this.responseMessage(500, this.DELETE_FAILED);
    }
  };

  // Get all student
  public getManyStudent = async(req: Request, res: Response) => {
    try {
      const { search } = req.body
      const page = parseInt(req.query.page as string) || 1;
      const result = await this.pagination(page, search)
      res.status(200).json({
        data: result.data,
        current: result.current,
        pages: result.pages
      })
    } catch (error) {
      
    }
  }

  // Get a student
  public getOneStudent = async(req: Request, res: Response) => {
    try {
      
    } catch (error) {
      
    }
  }
}

export default new StudentControllers();
