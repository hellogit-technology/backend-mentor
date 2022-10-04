import { Request, Response, NextFunction } from 'express';
import { injectFile } from '../../../utils/inject';

// Add files to layout
const files = {
  cssFile: injectFile('public/css', 'global'),
  jsFile: injectFile('public/js', 'global')
};

class RenderControllers {
  // [GET] /club/:slug
  dashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Trang chủ | Club Greenwich Vietnam';
      const dashboard = 'active';
      const heading = 'Trang chủ';
      res.status(200).render('leader/dashboard', {
        layout: 'layouts/leader/index',
        files,
        title,
        dashboard,
        heading
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /club/scores
  scores(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Điểm số | Club Greenwich Vietnam';
      const scores = 'active';
      const heading = 'Điểm số';
      res.status(200).render('leader/scores', {
        layout: 'layouts/leader/index',
        files,
        title,
        scores,
        heading
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /club/profile
  profile(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Câu lạc bộ | Club Greenwich Vietnam';
      const profile = 'active';
      const clubMenu = {
        main: 'hover show',
        sub: 'show'
      };
      const heading = 'Thông tin câu lạc bộ';
      res.status(200).render('leader/profile', {
        layout: 'layouts/leader/index',
        files,
        title,
        heading,
        clubMenu,
        profile
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /club/tutorial
  tutorial(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Hướng dẫn | Club Greenwich Vietnam';
      const tutorial = 'active';
      const heading = 'Hướng dẫn';
      res.status(200).render('leader/tutorial', {
        layout: 'layouts/leader/index',
        files,
        title,
        tutorial,
        heading
      });
    } catch (error) {
      console.log(error);
    }
  }

  //~ MAIL
  // [GET] /club/mail/sent
  mailSent(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Mail | Club Greenwich Vietnam';
      const mailMenu = {
        main: 'hover show',
        sub: 'show'
      };
      const heading = 'Tin nhắn đã gửi';
      res.status(200).render('', {
        layout: 'layouts/leader/index',
        files,
        title,
        mailMenu,
        heading
      });
    } catch (error) {
      console.log(error);
    }
  }

  //~ MANAGE
  // [GET] /club/manage
  club(req: Request, res: Response, next: NextFunction) {
    try {
      const title = 'Câu lạc bộ | Club Greenwich Vietnam';
      const manageClub = 'active';
      const clubMenu = {
        main: 'hover show',
        sub: 'show'
      };
      const heading = 'Quản lý câu lạc bộ';
      res.status(200).render('leader/manage/members', {
        layout: 'layouts/leader/index',
        files,
        title,
        clubMenu,
        heading,
        manageClub
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RenderControllers();
