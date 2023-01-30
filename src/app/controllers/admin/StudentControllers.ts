import { Request, Response, NextFunction } from 'express';
import { Student } from '../../models';
import { messageVietnamese } from '../../../utils/message';

class StudentControllers {
  // [POST] /api/student
  public async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseStudent {
        fullname: string;
        schoolId: string;
        email: string;
        campus: string;
        editor: string;
      }
      const profileSession: any = req.user;
      const { fullname, schoolId, email, campus } = req.body;
      const requestBody: BaseStudent = {
        fullname: fullname,
        schoolId: schoolId,
        email: email,
        campus: campus,
        editor: profileSession['userId'] as string
      };
      const newStudent = new Student(requestBody);
      const savedStudent = await newStudent.save();
      req.flash('result', 'successfully')
      req.flash('message', messageVietnamese.RES004B('sinh viên'));
      res.redirect('/admin/students');
    } catch (error) {
      req.session.modalAccount = 'student';
      req.flash('result', 'failed')
      req.flash('message', messageVietnamese.RES004A('sinh viên'));
      res.redirect('/admin/students');
    }
  }

  // [POST] /api/file-students
  public async uploadStudents(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }

  // [PATCH] /api/student/:id
  public async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseStudentUpdate {
        fullname?: string;
        schoolId?: string;
        email?: string;
        campus?: string;
        editor: string;
      }
      const profileSession: any = req.user;
      const { fullname, schoolId, email, campus } = req.body;
      const requestBody: BaseStudentUpdate = {
        editor: profileSession['userId'] as string
      };
      if (fullname) {
        requestBody['fullname'] = fullname;
      }
      if (schoolId) {
        requestBody['schoolId'] = schoolId;
      }
      if (email) {
        requestBody['email'] = email;
      }
      if (campus) {
        requestBody['campus'] = campus;
      }
      const student = await Student.findById(req.params.id);
      await student!.updateOne({ $set: requestBody });
      req.flash('result', 'successfully')
      req.flash('message', messageVietnamese.RES002B('sinh viên'));
      res.redirect('/admin/students');
    } catch (error) {
      req.session.modalAccount = 'student';
      req.flash('result', 'failed')
      req.flash('message', messageVietnamese.RES002A('sinh viên'));
      res.redirect('/admin/students');
    }
  }

  // [DELETE] /api/student/:id
  public async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await Student.findById(req.params.id);
      await student!.deleteOne();
      req.flash('result', 'successfully')
      req.flash('message', messageVietnamese.RES003B('sinh viên'));
      res.redirect('/admin/students');
    } catch (error) {
      req.flash('result', 'failed')
      req.flash('message', messageVietnamese.RES003A('sinh viên'));
      res.redirect('/admin/students');
    }
  }
}

export default new StudentControllers();
