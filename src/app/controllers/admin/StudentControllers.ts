import { Request, Response, NextFunction } from 'express';
import { Student } from '../../models';
import {messageVietnamese} from '../../../utils/message'

class StudentControllers {
  // [POST] /api/student
  async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      interface RequestBody {
        fullname: string,
        schoolId: string,
        email: string,
        campus: string,
        editor: string
      }
      const profileSession: any = req.user
      const {fullname, schoolId, email, campus} = req.body
      const requestBody: RequestBody = {
        fullname: fullname,
        schoolId: schoolId,
        email: email,
        campus: campus,
        editor: profileSession['userId'] as string,
      }
      const newStudent = new Student(requestBody);
      const savedStudent = await newStudent.save();
      req.flash('message', messageVietnamese.RES004B)
      res.redirect('/admin/students');
    } catch (error) {
      req.session.modalAccount = 'student'
      req.flash('error', messageVietnamese.RES004A)
      res.redirect('/admin/students');
    }
  }

  // [POST] /api/file-students
  async uploadStudents(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch (error) {
      
    }
  }

  // [PATCH] /api/student/:id
  async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      interface RequestBody {
        fullname?: string,
        schoolId?: string,
        email?: string,
        campus?: string,
        editor: string
      }
      const profileSession: any = req.user
      const {fullname, schoolId, email, campus} = req.body
      const requestBody: RequestBody = {
        editor: profileSession['userId'] as string
      }
      if(fullname) {
        requestBody['fullname'] = fullname
      }
      if(schoolId) {
        requestBody['schoolId'] = schoolId
      }
      if(email) {
        requestBody['email'] = email
      }
      if(campus) {
        requestBody['campus'] = campus
      }
      const student = await Student.findById(req.params.id);
      await student!.updateOne({ $set: requestBody });
      req.flash('message', messageVietnamese.RES002B)
      res.redirect('/admin/students');
    } catch (error) {
      req.session.modalAccount = 'student'
      req.flash('message', messageVietnamese.RES002A)
      res.redirect('/admin/students');
    }
  }

  // [DELETE] /api/student/:id
  async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await Student.findById(req.params.id);
      await student!.deleteOne();
      req.flash('message', messageVietnamese.RES003B)
      res.redirect('/admin/students');
    } catch (error) {
      req.flash('error', messageVietnamese.RES003A)
      res.redirect('/admin/students');
    }
  }
}

export default new StudentControllers();
