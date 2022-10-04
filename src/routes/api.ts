import express from 'express';
import eventsControllers from '../app/controllers/admin/EventsControllers';
import studentControllers from '../app/controllers/admin/StudentControllers';
import clubsControllers from '../app/controllers/admin/ClubsControllers';
import leaderAccountControllers from '../app/controllers/admin/LeaderAccountControllers';
import adminAccountControllers from '../app/controllers/admin/AdminAccountControllers';
import uploadControllers from '../app/controllers/admin/UploadControllers';

import { upload } from '../config/multer';

const router = express.Router();

// Event
router.route('/event').post(eventsControllers.createEvent).patch(eventsControllers.updateEvent).delete(eventsControllers.deleteEvent);

// Student
router.route('/student').post(studentControllers.createStudent).patch(studentControllers.updateStudent).delete(studentControllers.deleteStudent);
router.post('/file-students', upload.single('students'), uploadControllers.excelStudent);

// Club
router.route('/club').post(clubsControllers.createClub).patch(clubsControllers.updateClub).delete(clubsControllers.deleteClub);

// Leader Account
router.post('/leader-account', leaderAccountControllers.createLeader);
router.route('/leader-account/:id').patch(leaderAccountControllers.updateLeader).delete(leaderAccountControllers.deleteLeader);

// Admin Account
router.post('/admin-account', adminAccountControllers.createAdmin);
router.route('/admin-account/:id').patch(adminAccountControllers.updateAdmin).delete(adminAccountControllers.deleteAdmin);

// Poster
router.post('/poster', upload.single('poster'), uploadControllers.poster);

export default router;
