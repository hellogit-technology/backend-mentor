// import { Request, Response } from 'express';
// import { AccountSession } from '../../../../interface/ISession';
// import {} from '../../../../interface/leader/scores';

// class ScoresControllers {
//   public async addScores(req: Request, res: Response) {
//     try {
//       const accountSession: AccountSession = req.user!;
//       const { fullname, schoolId, email, campus } = req.body;
//       const requestBody: BaseStudent = {
//         fullname: fullname,
//         schoolId: schoolId,
//         email: email,
//         campus: campus,
//         editor: accountSession['userId'] as string
//       };
//       const newStudent = new Student(requestBody);
//       await newStudent.save();
//       req.flash('result', 'successfully');
//       req.flash('message', messageVietnamese.RES004B('sinh viên'));
//       res.redirect('/admin/students');
//     } catch (error) {
//       req.flash('modalStudent', 'true');
//       req.flash('result', 'failed');
//       req.flash('message', messageVietnamese.RES004A('sinh viên'));
//       res.redirect('/admin/students');
//     }
//   }

//   public async updateScores(req: Request, res: Response) {
//     try {
//       const accountSession: AccountSession = req.user!;
//       const scoresId = req.params.id;
//       const scores = await Scores.findById(scoresId);
//       const { eventScores, attitudeScores } = req.body;
//       const requestBody: BaseScoresUpdate = {
//         editor: {
//           userId: accountSession['userId'] as string,
//           role: accountSession['role'] as number
//         }
//       };
//       if (eventScores) {
//         const newEventsScoresArray = eventScores.map((element: EventScores) => element.scores);
//         const totalEventsScores = sumScores(newEventsScoresArray);
//         requestBody['event'] = eventScores;
//         requestBody['totalEvent'] = totalEventsScores;
//       }
//       if (attitudeScores) {
//         const newAttitudeScoresArray = attitudeScores.map((element: AttitudeScores) => element.club);
//         const totalAttitudeScores = sumScores(newAttitudeScoresArray);
//         requestBody['attitude'] = attitudeScores;
//         requestBody['totalEvent'] = totalAttitudeScores;
//       }
//       const userId: any = accountSession['userId'];
//       const role: any = accountSession['role'];
//       await scores?.updateOne({
//         $set: requestBody,
//         $push: {
//           historyEdit: {
//             userId: userId as UserObjectId,
//             role: role as Role
//           }
//         }
//       });
//       req.flash('result', 'successfully');
//       req.flash('message', messageVietnamese.RES002B('điểm'));
//       res.redirect('/admin/scores');
//     } catch (error) {
//       req.flash('modalScores', 'true');
//       req.flash('result', 'failed');
//       req.flash('message', messageVietnamese.RES002A('điểm'));
//       res.redirect('/admin/scores');
//     }
//   }
// }

// export default new ScoresControllers();
