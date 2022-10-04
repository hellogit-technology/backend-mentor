import { Request, Response, NextFunction } from 'express';
import { Student } from '../../models';

class StudentControllers {
  // [POST] /api/student
  async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const newStudent = new Student(req.body);
      const savedStudent = await newStudent.save();
      res.redirect('/admin/students');
    } catch (error) {
      console.log(error);
    }
  }

  // [PATCH] /api/student/:id
  async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await Student.findById(req.params.id);
      await student!.updateOne({ $set: req.body });
      res.redirect('/admin/students');
    } catch (error) {
      console.log(error);
    }
  }

  // [DELETE] /api/student/:id
  async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await Student.findById(req.params.id);
      await student!.deleteOne();
      res.redirect('/admin/students');
    } catch (error) {
      console.log(error);
    }
  }
}

export default new StudentControllers();
