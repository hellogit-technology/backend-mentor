import { Request, Response, NextFunction } from 'express';
import { sumScores } from '../../../utils/sum';
import { RequestBody, EventScores, AttitudeScores } from '../../../types/Scores';
import { getMonth } from '../../../utils/getTime';
import { Student, Scores } from '../../models';
import { messageVietnamese } from '../../../utils/message';

class ScoresControllers {
  // [POST] /api/
  public async createScores(req: Request, res: Response, next: NextFunction) {
    // Use transaction for Scores, Student
    const session = await Scores.startSession();
    session.startTransaction();

    try {
      let totalEvent;
      let totalAttitude;
      const profileSession: any = req.user;
      const { schoolId, fullname, email, eventScores, attitudeScores } = req.body;

      // Find student by school id & email
      const student = await Student.findOne({ schoolId: schoolId, email: email });

      // Student scores write to database
      const requestBody: RequestBody = {
        month: getMonth(),
        student: student!._id.toString(),
        editor: {
          userId: profileSession['userId'] as string,
          role: profileSession['role'] as number
        },
        historyEdit: [
          {
            userId: profileSession['userId'] as string,
            role: profileSession['role'] as number
          }
        ]
      };
      if (eventScores) {
        const arrayEventsScores: number[] = eventScores.map((event: EventScores) => parseInt(event.scores));
        const arrayEvents: string[] = eventScores.map((event: EventScores) => event.event);
        const arrayClubsStudent: any = student?.club;
        let missingClubs: any = [];
        arrayEvents.forEach((value, index) => {
          if (arrayClubsStudent.includes(value) === false) {
            missingClubs.push(value);
          }
        });
        student?.updateOne({ $push: { club: { $each: missingClubs } } }, { session: session });
        totalEvent = sumScores(arrayEventsScores);
        requestBody['event'] = eventScores;
        requestBody['totalEvent'] = totalEvent;
      }
      if (attitudeScores) {
        const arrayAttitude: number[] = attitudeScores.mao((attitude: AttitudeScores) => parseInt(attitude.scores));
        totalAttitude = sumScores(arrayAttitude);
        requestBody['totalAttitude'] = attitudeScores;
        requestBody['totalAttitude'] = totalAttitude;
      }
      const newScores = new Scores(requestBody);
      const savedScores = await newScores.save({ session: session });
      await session.commitTransaction();
      session.endSession();
      req.flash('result', 'successfully')
      req.flash('message', messageVietnamese.RES004B('điểm'));
      res.redirect('/admin/scores');
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      req.session.modalAccount = 'scores';
      req.flash('result', 'failed')
      req.flash('message', messageVietnamese.RES004A('điểm'));
      res.redirect('/admin/scores');
    }
  }

  // [PATCH] /api/
  public async updateScores(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }

  // [DELETE] /api
  public async deleteScores(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }
}

export default new ScoresControllers();
