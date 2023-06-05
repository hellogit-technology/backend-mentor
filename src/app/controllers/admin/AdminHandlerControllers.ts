import { Router } from 'express';
import adminAccountControllers from './helpers/AdminAccountControllers';
import clubsControllers from './helpers/ClubsControllers';
import eventsControllers from './helpers/EventsControllers';
import clubAccountControllers from './helpers/ClubAccountControllers';
import scoresControllers from './helpers/ScoresControllers';
import studentControllers from './helpers/StudentControllers';
import auth from '../../../middleware/guard/auth';
import throttling from '../../../middleware/guard/throttling';
import validation from '../../../middleware/validation/validation';
import { upload } from '../../../config/multer';

class HandlerControllers {
  public router = Router();

  constructor() {
    this.router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.route('/event').post(throttling.rateLimitation(), upload.single('poster'), eventsControllers.createEvent).get();
    this.router
      .route('/event/:id')
      .patch(throttling.rateLimitation(), validation.validationParam, upload.single('poster'), eventsControllers.updateEvent)
      .delete(throttling.rateLimitation(), validation.validationParam, eventsControllers.deleteEvent)
      .get();

    this.router.route('/club').post(throttling.rateLimitation(), upload.single('avatar'), clubsControllers.createClub).get();
    this.router
      .route('/club/:id')
      .patch(throttling.rateLimitation(), validation.validationParam, upload.single('avatar'), clubsControllers.updateClub)
      .delete(throttling.rateLimitation(), validation.validationParam, clubsControllers.deleteClub)
      .get();

    this.router.route('/student').post(throttling.rateLimitation(), studentControllers.createStudent).get();
    this.router.post('/file-student', throttling.rateLimitation(10, 3600), upload.single('students'), studentControllers.uploadStudents);
    this.router
      .route('/student/:id')
      .patch(throttling.rateLimitation(), validation.validationParam, studentControllers.updateStudent)
      .delete(throttling.rateLimitation(), validation.validationParam, studentControllers.deleteStudent)
      .get();

    this.router.route('/scores').post(throttling.rateLimitation(), scoresControllers.createScores).get();
    this.router
      .route('/scores/:id')
      .patch(throttling.rateLimitation(), validation.validationParam, scoresControllers.updateScores)
      .delete(throttling.rateLimitation(), validation.validationParam, scoresControllers.deleteScores)
      .get();

    this.router.route('/club-account').post(throttling.rateLimitation(), clubAccountControllers.createAccount).get();
    this.router
      .route('/club-account/:id')
      .patch(throttling.rateLimitation(), validation.validationParam, clubAccountControllers.updateAccount)
      .delete(throttling.rateLimitation(), validation.validationParam, clubAccountControllers.deleteAccount)
      .get();

    this.router
      .route('/admin-account')
      .post(auth.roleAccess(['Admin']), throttling.rateLimitation(), adminAccountControllers.createAccount)
      .get(auth.roleAccess(['Admin']), adminAccountControllers.getManyAccount);
    this.router
      .route('/admin-account/:id')
      .patch(auth.roleAccess(['Admin']), throttling.rateLimitation(), validation.validationParam, adminAccountControllers.updateAccount)
      .delete(auth.roleAccess(['Admin']), throttling.rateLimitation(), validation.validationParam, adminAccountControllers.deleteAccount)
      .get(auth.roleAccess(['Admin']), adminAccountControllers.getOneAccount);
  }
}

export default new HandlerControllers();
