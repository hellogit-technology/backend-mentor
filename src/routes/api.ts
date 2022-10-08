import express from 'express';
import eventsControllers from '../app/controllers/admin/EventsControllers';
import studentControllers from '../app/controllers/admin/StudentControllers';
import clubsControllers from '../app/controllers/admin/ClubsControllers';
import leaderAccountControllers from '../app/controllers/admin/LeaderAccountControllers';
import adminAccountControllers from '../app/controllers/admin/AdminAccountControllers';
import posterControllers from '../app/controllers/admin/PosterControllers'
import scoresControllers from '../app/controllers/admin/ScoresControllers';

import { upload } from '../config/multer';

const router = express.Router();

// Event
router.post('/event', eventsControllers.createEvent)
router.route('/event/:id').patch(eventsControllers.updateEvent).delete(eventsControllers.deleteEvent);

// Student
router.post('/student', studentControllers.createStudent)
router.route('/student/:id').patch(studentControllers.updateStudent).delete(studentControllers.deleteStudent);
router.post('/file-students', upload.single('students'), studentControllers.uploadStudents);

// Club
router.post('/club', upload.single('avatar'), clubsControllers.createClub)
router.route('/club/:id').patch(clubsControllers.updateClub).delete(clubsControllers.deleteClub);

// Leader Account
router.post('/leader-account', leaderAccountControllers.createLeader);
router.route('/leader-account/:id').patch(leaderAccountControllers.updateLeader).delete(leaderAccountControllers.deleteLeader);

// Admin Account
router.post('/admin-account', adminAccountControllers.createAdmin);
router.route('/admin-account/:id').patch(adminAccountControllers.updateAdmin).delete(adminAccountControllers.deleteAdmin);

// Poster
router.post('/poster', upload.array('poster', 10), posterControllers.uploadPosters);

// Scores
router.post('/scores', scoresControllers.createScores)
router.route('/scores/:id')
    .patch(scoresControllers.updateScores)
    .delete(scoresControllers.deleteScores)

export default router;
