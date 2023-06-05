import { Request, Response, NextFunction } from 'express';
import { sumScores } from '../../../../utils/sum';
import { BaseScores, BaseScoresUpdate, EventScores, AttitudeScores } from '../../../../interface/IScores';
import { getMonth } from '../../../../utils/getTime';
import { Student, Scores } from '../../../models';
import { messageVietnamese } from '../../../../utils/message';
import { IAccountSession } from '../../../../interface/ISession';
import mongoose, { Schema } from 'mongoose';

type UserObjectId = {
  type: typeof Schema.Types.ObjectId;
};

type Role = {
  type: NumberConstructor;
};

/**
 * @description Handle Scores RestfulAPI
 * @author Merlin Le
 */

class ScoresControllers {
  /**
   * [POST] /api/scores
   * @function createScores
   * @description Create scores of a student
   */

  public async createScores(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: IAccountSession = req.user!;
      const { schoolId, eventScores, attitudeScores } = req.body;
      const student = await Student.findOne({ schoolId: schoolId });
      const requestBody: BaseScores = {
        month: getMonth(),
        student: student!._id.toString(),
        editor: {
          userId: accountSession['userId'] as string,
          role: accountSession['role'] as number
        },
        historyEdit: [
          {
            userId: accountSession['userId'] as string,
            role: accountSession['role'] as number
          }
        ]
      };
      if (eventScores) {
        const arrayEventsScores: number[] = eventScores.map((event: EventScores) => event.scores);
        const totalEventScores = sumScores(arrayEventsScores);
        requestBody['event'] = eventScores;
        requestBody['totalEvent'] = totalEventScores;
      }
      if (attitudeScores) {
        const arrayAttitudeScores: number[] = attitudeScores.map((attitude: AttitudeScores) => attitude.scores);
        const totalAttitudeScores = sumScores(arrayAttitudeScores);
        requestBody['attitude'] = attitudeScores;
        requestBody['totalAttitude'] = totalAttitudeScores;
      }
      const newScores = new Scores(requestBody);
      await newScores.save();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES004B('điểm'));
      res.redirect('/admin/scores');
    } catch (error) {
      req.flash('modalScores', 'true');
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES004A('điểm'));
      res.redirect('/admin/scores');
    }
  }

  /**
   * [PATCH] /api/scores/:id
   * @function updateScores
   * @description Update scores of a student
   */

  public async updateScores(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: IAccountSession = req.user!;
      const scoresId = req.params.id;
      const scores = await Scores.findById(scoresId);
      const { eventScores, attitudeScores } = req.body;
      const requestBody: BaseScoresUpdate = {
        editor: {
          userId: accountSession['userId'] as string,
          role: accountSession['role'] as number
        }
      };
      if (eventScores) {
        const newEventsScoresArray = eventScores.map((element: EventScores) => element.scores);
        const totalEventsScores = sumScores(newEventsScoresArray);
        requestBody['event'] = eventScores;
        requestBody['totalEvent'] = totalEventsScores;
      }
      if (attitudeScores) {
        const newAttitudeScoresArray = attitudeScores.map((element: AttitudeScores) => element.club);
        const totalAttitudeScores = sumScores(newAttitudeScoresArray);
        requestBody['attitude'] = attitudeScores;
        requestBody['totalEvent'] = totalAttitudeScores;
      }
      const userId: any = accountSession['userId'];
      const role: any = accountSession['role'];
      await scores?.updateOne({
        $set: requestBody,
        $push: {
          historyEdit: {
            userId: userId as UserObjectId,
            role: role as Role
          }
        }
      });
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES002B('điểm'));
      res.redirect('/admin/scores');
    } catch (error) {
      req.flash('modalScores', 'true');
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES002A('điểm'));
      res.redirect('/admin/scores');
    }
  }

  /**
   * [DELETE] /api/scores/:id
   * @function deleteScores
   * @description Remove scores of a student
   * @alias DeletedScores Storage all deleted scores
   */

  public async deleteScores(req: Request, res: Response, next: NextFunction) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const scores = await Scores.findById(req.params.id);
      await scores!.deleteOne();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES003B('điểm'));
      res.redirect('/admin/scores');
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      req.flash('modalScores', 'true');
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES003A('điểm'));
      res.redirect('/admin/scores');
    }
  }
}

export default new ScoresControllers();
