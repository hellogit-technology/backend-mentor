import { Request, Response, NextFunction } from 'express';
import { Student } from '../../models';
import { messageVietnamese } from '../../../utils/message';
import { AccountSession } from '../../../types/Passport';
import {importFile} from '../../../utils/handleExcel'

/**
 * @description Handle Student RestfulAPI
 * @author Merlin Le
 */

class StudentControllers {
  /**
   * [POST] /api/student
   * @function createStudent
   * @description Add a student
   */

  public async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseStudent {
        fullname: string;
        schoolId: string;
        email: string;
        campus: string;
        editor: string;
      }
      const accountSession: AccountSession = req.user!;
      const { fullname, schoolId, email, campus } = req.body;
      const requestBody: BaseStudent = {
        fullname: fullname,
        schoolId: schoolId,
        email: email,
        campus: campus,
        editor: accountSession['userId'] as string
      };
      const newStudent = new Student(requestBody);
      await newStudent.save();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES004B('sinh viên'));
      res.redirect('/admin/students');
    } catch (error) {
      req.flash('modalStudent', 'true');
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES004A('sinh viên'));
      res.redirect('/admin/students');
    }
  }

  /**
   * [POST] /api/file-students
   * @function uploadStudents
   * @description Add many students using excel file
   * @implements
   */

  public async uploadStudents(req: Request, res: Response, next: NextFunction) {
    try {
      importFile(req.file!.buffer)
      res.end()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * [PATCH] /api/student/:id
   * @function updateStudent
   * @description Update a student
   */

  public async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseStudentUpdate {
        fullname?: string;
        schoolId?: string;
        email?: string;
        campus?: string;
        editor: string;
      }
      const accountSession: AccountSession = req.user!;
      const { fullname, schoolId, email, campus } = req.body;
      const requestBody: BaseStudentUpdate = {
        editor: accountSession['userId'] as string
      };
      if (fullname) requestBody['fullname'] = fullname;
      if (schoolId) requestBody['schoolId'] = schoolId;
      if (email) requestBody['email'] = email;
      if (campus) requestBody['campus'] = campus;
      const student = await Student.findById(req.params.id);
      await student!.updateOne({ $set: requestBody });
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES002B('sinh viên'));
      res.redirect('/admin/students');
    } catch (error) {
      req.flash('modalStudent', 'true');
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES002A('sinh viên'));
      res.redirect('/admin/students');
    }
  }

  /**
   * [DELETE] /api/student/:id
   * @function deleteStudent
   * @description Remove a student
   */

  public async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await Student.findById(req.params.id);
      await student!.deleteOne();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES003B('sinh viên'));
      res.redirect('/admin/students');
    } catch (error) {
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES003A('sinh viên'));
      res.redirect('/admin/students');
    }
  }
}

export default new StudentControllers();
