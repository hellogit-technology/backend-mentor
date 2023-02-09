import express from 'express';
import eventsControllers from '../app/controllers/admin/EventsControllers';
import studentControllers from '../app/controllers/admin/StudentControllers';
import clubsControllers from '../app/controllers/admin/ClubsControllers';
import leaderAccountControllers from '../app/controllers/admin/LeaderAccountControllers';
import adminAccountControllers from '../app/controllers/admin/AdminAccountControllers';
import posterControllers from '../app/controllers/admin/PosterControllers';
import scoresControllers from '../app/controllers/admin/ScoresControllers';
import helpersControllers from '../app/controllers/HelpersControllers';
import guard, {LimitConnfiguration} from '../middleware/gateway/guard';
import { upload } from '../config/multer';

interface Configuration {
    [key: string]: {
        [key: string]: LimitConnfiguration
    }
}

const router = express.Router();

/**
 * @constant configuration
 * @constant request: Number of request(s)
 * @constant time: By second(s)
 */

const configuration: Configuration = {
    event: {
        post: {request: 500, time: 3600},
        patch: {request: 500, time: 3600},
        delete: {request: 15, time: 3600}
    },
    club: {
        post: {request: 500, time: 3600},
        patch: {request: 500, time: 3600},
        delete: {request: 15, time: 3600}
    },
    scores: {
        post: {request: 15, time: 3600},
        patch: {request: 1000, time: 3600},
        delete: {request: 5, time: 3600}
    },
    leader: {
        post: {request: 50, time: 3600},
        patch: {request: 50, time: 3600},
        delete: {request: 50, time: 3600}
    },
    admin: {
        post: {request: 50, time: 3600},
        patch: {request: 50, time: 3600},
        delete: {request: 50, time: 3600}
    },
    student: {
        upload: {request: 1000, time: 3600},
        post: {request: 1000, time: 3600},
        patch: {request: 1000, time: 3600},
        delete: {request: 50, time: 3600}
    },
    poster: {}
}

// Event
router.post('/event', upload.single('poster'), [guard.rateLimitation(configuration.event['post'], 'post')], eventsControllers.createEvent);
router.route('/event/:id')
    .patch(upload.single('poster'), [guard.rateLimitation(configuration.event['patch'], 'patch')], [guard.validationParameter], eventsControllers.updateEvent)
    .delete([guard.rateLimitation(configuration.event['delete'], 'delete')], [guard.validationParameter], eventsControllers.deleteEvent);

// Student
router.post('/student', [guard.rateLimitation(configuration.student['post'], 'post')], studentControllers.createStudent);
router.route('/student/:id')
    .patch([guard.rateLimitation(configuration.student['patch'], 'patch')], [guard.validationParameter], studentControllers.updateStudent)
    .delete([guard.rateLimitation(configuration.student['delete'], 'delete')], [guard.validationParameter], studentControllers.deleteStudent);
router.post('/file-students', upload.single('students'), [guard.rateLimitation(configuration.student['upload'], 'other')], studentControllers.uploadStudents);

// Club
router.post('/club', upload.single('avatar'), [guard.rateLimitation(configuration.club['post'], 'post')], clubsControllers.createClub);
router.route('/club/:id')
    .patch(upload.single('avatar'), [guard.rateLimitation(configuration.club['patch'], 'patch')], [guard.validationParameter], clubsControllers.updateClub)
    .delete([guard.rateLimitation(configuration.club['delete'], 'delete')], [guard.validationParameter], clubsControllers.deleteClub);

// Leader Account
router.post('/leader-account', [guard.rateLimitation(configuration.leader['post'], 'post')], leaderAccountControllers.createLeader);
router.route('/leader-account/:id')
    .patch([guard.rateLimitation(configuration.leader['patch'], 'patch')], [guard.validationParameter], leaderAccountControllers.updateLeader)
    .delete([guard.rateLimitation(configuration.leader['delete'], 'delete')], [guard.validationParameter], leaderAccountControllers.deleteLeader);

// Admin Account
router.post('/admin-account', [guard.rateLimitation(configuration.admin['post'], 'post')], adminAccountControllers.createAdmin);
router.route('/admin-account/:id')
    .patch([guard.rateLimitation(configuration.admin['patch'], 'patch')], [guard.validationParameter], adminAccountControllers.updateAdmin)
    .delete([guard.rateLimitation(configuration.admin['delete'], 'delete')], [guard.validationParameter], adminAccountControllers.deleteAdmin);

// Poster
router.post('/poster', upload.array('annPoster', 10), posterControllers.uploadPosters);

// Scores
router.post('/scores', [guard.rateLimitation(configuration.scores['post'], 'post')], scoresControllers.createScores);
router.route('/scores/:id')
    .patch([guard.rateLimitation(configuration.scores['patch'], 'patch')], [guard.validationParameter], scoresControllers.updateScores)
    .delete([guard.rateLimitation(configuration.scores['delete'], 'delete')], [guard.validationParameter], scoresControllers.deleteScores);

// Helper
router.post('/check-campus', helpersControllers.campusIsValid);
router.post('/check-club', helpersControllers.clubIsValid);
router.post('/check-account-email', helpersControllers.accountEmailExist);
router.post('/check-club-email', helpersControllers.clubEmailExist);
router.post('/check-club-id', helpersControllers.clubIdExist);
router.post('/check-club-nickname', helpersControllers.clubNicknameExist);
router.post('/check-event-id', helpersControllers.eventIdExist);
router.post('/check-student-email', helpersControllers.studentEmailExist);
router.post('/check-student-id', helpersControllers.studentIdExist);
router.post('/check-account-email-pdp-update', helpersControllers.accountEmailAdminUpdate);
router.post('/check-account-email-leader-update', helpersControllers.accountEmailLeaderUpdate);
router.post('/download-qrcode', helpersControllers.downloadQRCode);
router.post('/event/qrcode-status', helpersControllers.getStatusExpire);
router.post('/event/:id/expire', helpersControllers.setStatusExpire);

export default router;
