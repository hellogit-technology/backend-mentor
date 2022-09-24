import { Request, Response, NextFunction } from 'express';
import { injectFile } from '../../../utils/inject';
import {Campus, Club} from '../../models'

// Add files to layout
const files = {
  cssFile: injectFile('public/css', 'global'),
  cssValidation: injectFile('public/css' , 'validation'),
  jsFile: injectFile('public/js', 'global'),
  jsValidation: injectFile('public/js', 'validation')
};
const slug = 'minh-toan';

class RenderControllers {
  // [GET] /admin/dashboard
  dashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Trang chủ | PDP Greenwich Vietnam';
      const dashboard = 'active';
      const heading = 'Trang chủ';
      res.status(200).render('admin/dashboard', {
        layout: 'layouts/admin/index',
        files,
        title,
        dashboard,
        slug,
        heading
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
      const title = 'Điểm số | PDP Greenwich Vietnam';
      const scores = 'active';
      const heading = 'Điểm số'
      res.status(200).render('admin/scores', {
        layout: 'layouts/admin/index',
        files,
        title,
        scores,
        slug,
        heading
      });
    } catch (error) {
      console.log(error);
    }
  }

  // GET /admin/system
  system(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Hệ thống | PDP Greenwich Vietnam';
      const system = 'active';
      const heading = 'Hệ thống'
      res.status(200).render('admin/system', {
        layout: 'layouts/admin/index',
        files,
        title,
        system,
        heading,
        slug
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/tutorial
  tutorial(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Hướng dẫn | PDP Greenwich Vietnam';
      const tutorial = 'active';
      const heading = 'Hướng dẫn'
      res.status(200).render('admin/tutorial', {
        layout: 'layouts/admin/index',
        files,
        title,
        tutorial,
        slug,
        heading
      });
    } catch (error) {
      console.log(error);
    }
  }

  //~ MAIL
  // [GET] /admin/mail/sent
  mailSent(req: Request, res: Response, next: NextFunction) {
    try {
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
  // [GET] /admin/manage-clubs
  clubs(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Câu lạc bộ | PDP Greenwich Vietnam';
      const manageClubs = 'active';
      const heading = 'Câu lạc bộ'
      const clubsMenu = {
        main: 'hover show',
        sub: 'show'
      };
      res.status(200).render('admin/manage/clubs', {
        layout: 'layouts/admin/index',
        files,
        title,
        manageClubs,
        slug,
        clubsMenu,
        heading
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/club/:slug
  clubMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Câu lạc bộ | PDP Greenwich Vietnam';
      const manageClubs = 'active';
      const heading = ''
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
        clubsMenu
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/events
  events(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Sự kiện | PDP Greenwich Vietnam';
      const events = 'active';
      const heading = 'Sự kiện'
      const eventsMenu = {
        main: 'hover show',
        sub: 'show'
      };
      res.status(200).render('admin/manage/events', {
        layout: 'layouts/admin/index',
        files,
        title,
        events,
        slug,
        eventsMenu,
        heading
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/students
  students(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Sinh viên | PDP Greenwich Vietnam';
      const students = 'active';
      const heading = 'Sinh viên'
      const studentsMenu = {
        main: 'hover show',
        sub: 'show'
      };
      res.status(200).render('admin/manage/students', {
        layout: 'layouts/admin/index',
        files,
        title,
        students,
        slug,
        studentsMenu,
        heading
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/accounts
  async accounts(req: Request, res: Response, next: NextFunction) {
    try {

      // Show data info of page
      const title = 'Tài khoản | PDP Greenwich Vietnam'
      const account = 'active'
      const heading = 'Tài khoản'

      // Query 
      const campus = await Campus.find({})
      const club = await Club.find({})
      
      res.status(200).render('admin/manage/account', {
        layout: 'layouts/admin/index',
        files, title, account, slug, heading,
        campus, club
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RenderControllers();
