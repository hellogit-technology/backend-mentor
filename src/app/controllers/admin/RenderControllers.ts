import { Request, Response, NextFunction } from 'express';
import { injectFile } from '../../../utils/inject';
import path from 'path';
import { Campus, Event, Club, AdminAccount, LeaderAccount, Student } from '../../models';

// Add files to layout
const environment = process.env.NODE_ENV!;
const forWebpackDir = {
  css: path.join(__dirname, '../public/css'),
  js: path.join(__dirname, '../public/js')
};
const defaultDir = {
  css: path.join(__dirname, '../../../../public/css'),
  js: path.join(__dirname, '../../../../public/js')
};
const files = {
  cssFile: injectFile(environment === 'development' ? defaultDir.css : forWebpackDir.css, 'global'),
  cssValidation: injectFile(environment === 'development' ? defaultDir.css : forWebpackDir.css, 'validation'),
  jsFile: injectFile(environment === 'development' ? defaultDir.js : forWebpackDir.js, 'global'),
  jsValidation: injectFile(environment === 'development' ? defaultDir.js : forWebpackDir.js, 'validation'),
  jsHelpers: injectFile(environment === 'development' ? defaultDir.js : forWebpackDir.js, 'helpers')
};

const slug = 'minh-toan';

class RenderControllers {
  // [GET] /admin/dashboard
  dashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const profileSession: any = req.user;
      const title = 'Trang chủ | PDP Greenwich Vietnam';
      const dashboard = 'active';
      const heading = 'Trang chủ';
      res.status(200).render('admin/dashboard', {
        layout: 'layouts/admin/index',
        files,
        title,
        dashboard,
        slug,
        heading,
        profileSession
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/profile/:slug
  profile(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render('admin/profile', {
        layout: 'layouts/admin/index',
        files,
        slug
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/scores
  scores(req: Request, res: Response, next: NextFunction) {
    try {
      const profileSession: any = req.user;
      const title = 'Điểm số | PDP Greenwich Vietnam';
      const scores = 'active';
      const heading = 'Điểm số';
      res.status(200).render('admin/scores', {
        layout: 'layouts/admin/index',
        files,
        title,
        scores,
        slug,
        heading,
        profileSession
      });
    } catch (error) {
      console.log(error);
    }
  }

  // GET /admin/system
  system(req: Request, res: Response, next: NextFunction) {
    try {
      const profileSession: any = req.user;
      const title = 'Hệ thống | PDP Greenwich Vietnam';
      const system = 'active';
      const heading = 'Hệ thống';
      res.status(200).render('admin/system', {
        layout: 'layouts/admin/index',
        files,
        title,
        system,
        heading,
        slug,
        profileSession
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/tutorial
  tutorial(req: Request, res: Response, next: NextFunction) {
    try {
      const profileSession: any = req.user;
      const title = 'Hướng dẫn | PDP Greenwich Vietnam';
      const tutorial = 'active';
      const heading = 'Hướng dẫn';
      res.status(200).render('admin/tutorial', {
        layout: 'layouts/admin/index',
        files,
        title,
        tutorial,
        slug,
        heading,
        profileSession
      });
    } catch (error) {
      console.log(error);
    }
  }

  //~ MAIL
  // [GET] /admin/mail/sent
  mailSent(req: Request, res: Response, next: NextFunction) {
    try {
      const profileSession: any = req.user;
      const title = 'Mail | PDP Greenwich Vietnam';
      const mail = 'active';
      const mailMenu = {
        main: 'hover show',
        sub: 'show'
      };
      res.status(200).render('admin/mail/sent', {
        layout: 'layouts/admin/index',
        files,
        title,
        mail,
        slug,
        mailMenu
      });
    } catch (error) {
      console.log(error);
    }
  }

  //~ MANAGE
  // [GET] /admin/clubs
  async clubs(req: Request, res: Response, next: NextFunction) {
    try {
      const profileSession: any = req.user;
      const title = 'Câu lạc bộ | PDP Greenwich Vietnam';
      const manageClubs = 'active';
      const heading = 'Câu lạc bộ';
      const clubsMenu = {
        main: 'hover show',
        sub: 'show'
      };
      const clubs = await Club.find({}).populate('editor');
      res.status(200).render('admin/manage/clubs', {
        layout: 'layouts/admin/index',
        files,
        title,
        manageClubs,
        slug,
        clubsMenu,
        heading,
        profileSession,
        clubs
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/club/:slug
  clubMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const profileSession: any = req.user;
      const title = 'Câu lạc bộ | PDP Greenwich Vietnam';
      const manageClubs = 'active';
      const heading = '';
      const clubsMenu = {
        main: 'hover show',
        sub: 'show'
      };
      res.status(200).render('admin/manage/club-members', {
        layout: 'layouts/admin/index',
        files,
        title,
        manageClubs,
        slug,
        clubsMenu,
        profileSession
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/events
  async events(req: Request, res: Response, next: NextFunction) {
    try {
      const profileSession: any = req.user;
      const title = 'Sự kiện | PDP Greenwich Vietnam';
      const events = 'active';
      const heading = 'Sự kiện';
      const eventsMenu = {
        main: 'hover show',
        sub: 'show'
      };

      const eventsSchool = await Event.find({}).populate('club');
      res.status(200).render('admin/manage/events', {
        layout: 'layouts/admin/index',
        files,
        title,
        events,
        slug,
        eventsMenu,
        heading,
        profileSession,
        eventsSchool
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/event/:id/:slug
  async eventDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const profileSession: any = req.user;
      const title = 'Sự kiện | PDP Greenwich Vietnam';
      const events = 'active';
      const heading = 'Sự kiện';

      const eventsSchool = await Event.find({}).populate('club');
      res.status(200).render('admin/manage/events', {
        layout: 'layouts/admin/index',
        files,
        title,
        events,
        slug,
        heading,
        profileSession,
        eventsSchool
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/students
  async students(req: Request, res: Response, next: NextFunction) {
    try {
      const profileSession: any = req.user;
      const title = 'Sinh viên | PDP Greenwich Vietnam';
      const students = 'active';
      const heading = 'Sinh viên';
      const studentsMenu = {
        main: 'hover show',
        sub: 'show'
      };
      const campus = await Campus.find({});
      const student = await Student.find({}).populate('campus').populate('editor');
      res.status(200).render('admin/manage/students', {
        layout: 'layouts/admin/index',
        files,
        title,
        students,
        slug,
        studentsMenu,
        heading,
        profileSession,
        student,
        campus
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/accounts
  async accounts(req: Request, res: Response, next: NextFunction) {
    try {
      // Show info of page
      const profileSession: any = req.user;
      const title = 'Tài khoản | PDP Greenwich Vietnam';
      const account = 'active';
      const heading = 'Tài khoản';

      // Query
      const campus = await Campus.find({});
      const club = await Club.find({});
      const adminAccount = await AdminAccount.find({}).populate('campus').populate('editor');
      const leaderAccount = await LeaderAccount.find({}).populate('campus').populate('club').populate('editor');

      // Message
      const message = req.flash('message');
      const warning = req.flash('error');
      const modalShow = req.session.modalAccount;

      res.status(200).render('admin/manage/account', {
        layout: 'layouts/admin/index',
        files,
        title,
        account,
        slug,
        heading,
        campus,
        club,
        profileSession,
        adminAccount,
        leaderAccount,
        message,
        warning,
        modalShow
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RenderControllers();
