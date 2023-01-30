import { Request, Response, NextFunction } from 'express';
import { injectFile } from '../../../utils/inject';
import path from 'path';
import { Campus, Event, Club, AdminAccount, LeaderAccount, Student } from '../../models';
import {AccountSession} from '../../../types/Passport'

/**
 * @description Render ejs and assets for client (Server-side rendering)
 * @author Merlin Le
 */

class RenderControllers {

  /**
   * @constant defaultDir: Get assets relative path
   * @constant injectionAssets: Get file name 
   * @constant limitItems: Limit items in pagination
   */

  private static readonly defaultDir = {                        
    css: path.join(__dirname, '../../../../public/css'),
    js: path.join(__dirname, '../../../../public/js')
  }
  private static readonly injectionAssets = {
    cssFile: injectFile(RenderControllers.defaultDir.css, 'global'),
    cssValidation: injectFile(RenderControllers.defaultDir.css, 'validation'),
    cssToast: injectFile(RenderControllers.defaultDir.css, 'toast'),
    jsFile: injectFile(RenderControllers.defaultDir.js, 'global'),
    jsValidation: injectFile(RenderControllers.defaultDir.js, 'validation'),
    jsHelpers: injectFile(RenderControllers.defaultDir.js, 'helpers'),
    jsToast: injectFile(RenderControllers.defaultDir.js, 'toast')    
  }
  private static readonly limitItems = {
    clubs: 20,
    events: 20,
    students: 20,
    adminAccount: 20,
    leaderAccount: 20
  }

  /** 
   * [GET] /admin/dashboard
   * @function dashboard
   * 
   */

  public async dashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Trang chủ | PDP Greenwich Vietnam',
        dashboard: 'active',
        heading: 'Trang chủ'
      }
      const [campusResult, clubsResult] = await Promise.all([Campus.find({}), Club.find({})])
      const queryData = {
        campus: campusResult,
        clubs: clubsResult
      }
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      }
      res.status(200).render('admin/dashboard', {
        layout: 'layouts/admin/index',
        files,  
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/profile/:slug
   * @function profile
   *
   */

  /**
   * @implements profile
   */
  public async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const files = RenderControllers.injectionAssets
      const campus = await Campus.find({})
      res.status(200).render('admin/profile', {
        layout: 'layouts/admin/index',
        files,
        campus,
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/system
   * @function system
   * 
   */
  
  public async system(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Hệ thống | PDP Greenwich Vietnam',
        system: 'active',
        heading: 'Hệ thống'
      }
      const [campusResult, clubsResult] = await Promise.all([Campus.find({}), Club.find({})])
      const queryData = {
        campus: campusResult,
        clubs: clubsResult
      }
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      }
      res.status(200).render('admin/system', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/tutorial
   * @function tutorial
   * 
   */

  public async tutorial(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Hướng dẫn | PDP Greenwich Vietnam',
        tutorial: 'active',
        heading: 'Hướng dẫn',
      }
      const [campusResult, clubsResult] = await Promise.all([Campus.find({}), Club.find({})])
      const queryData = {
        campus: campusResult,
        clubs: clubsResult
      }
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      }
      res.status(200).render('admin/tutorial', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/scores
   * @function scores
   * @typedef management
   */

  /**
   * @implements scores
   */
  public async scores(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Điểm số | PDP Greenwich Vietnam',
        scores: 'active',
        heading: 'Điểm số',
      }
      const [campusResult, clubsResult] = await Promise.all([Campus.find({}), Club.find({})])
      const queryData = {
        campus: campusResult,
        clubs: clubsResult
      }
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      }
      const validationMessage = {

      }
      res.status(200).render('admin/manage/scores', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/clubs
   * @function clubs
   * @typedef management
   * 
   */
  
  public async clubs(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const page = parseInt(req.query.page as string) || 1;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Câu lạc bộ | PDP Greenwich Vietnam',
        manageClubs: 'active',
        heading: 'Câu lạc bộ',
        clubsMenu: {
          main: 'hover show',
          sub: 'show'
        }
      }
      const [campusResult, clubsResult] = await Promise.all([
        Campus.find({}), 
        Club.find({})
          .populate('editor')
          .limit(RenderControllers.limitItems.clubs)
          .skip(page * RenderControllers.limitItems.clubs - RenderControllers.limitItems.clubs),
      ])
      const queryData = {
        campus: campusResult,
        clubs: clubsResult
      }
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      }
      const validation = {

      }
      res.status(200).render('admin/manage/clubs', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/club/:id/:slug
   * @function clubMembers
   * @typedef detail
   */
  
  public async clubMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Câu lạc bộ | PDP Greenwich Vietnam',
        manageClubs: 'active',
        heading: '',
        clubsMenu: {
          main: 'hover show',
          sub: 'show'
        }
      }
      const queryData = {
        campus: await Campus.find({})
      }
      res.status(200).render('admin/manage/club-members', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/events
   * @function events
   * @typedef management
   */
  
  public async events(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const page = parseInt(req.query.page as string) || 1;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Sự kiện | PDP Greenwich Vietnam',
        events: 'active',
        heading: 'Sự kiện',
        eventsMenu: {
          main: 'hover show',
          sub: 'show'
        }
      }
      const [campusResult, clubsResult, eventsResult] = await Promise.all([
        Club.find({}), Campus.find({}),
        Event.find({})
          .populate('club').populate('campus').populate('editor')
          .limit(RenderControllers.limitItems.events)
          .skip(page * RenderControllers.limitItems.events - RenderControllers.limitItems.events),
      ])
      const queryData = {
        clubs: clubsResult,
        campus: campusResult,
        eventsSchool: eventsResult
      }
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      }
      const validationMessage = {

      }
      res.status(200).render('admin/manage/events', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/event/:id/:slug
   * @function eventDetail
   * @typedef detail 
   */

  public async eventDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Sự kiện | PDP Greenwich Vietnam',
        events: 'active',
        heading: 'Sự kiện',
      }
      const [campusResult, eventsResult] = await Promise.all([
        Campus.find({}),
        Event.find({}).populate('club'),
      ])
      const queryData = {
        campus: campusResult,
        eventsSchool: eventsResult
      }

      // Message
      res.status(200).render('admin/manage/events', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/students
   * @function students
   * @typedef management
   */

  public async students(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const page = parseInt(req.query.page as string) || 1;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Sinh viên | PDP Greenwich Vietnam',
        students: 'active',
        heading: 'Sinh viên',
        studentsMenu: {
          main: 'hover show',
          sub: 'show'
        }
      }
      const [campusResult, clubsResult, studentsResult] = await Promise.all([
        Campus.find({}), Club.find({}),
        Student.find({})
        .populate('campus')
        .populate('editor')
        .limit(RenderControllers.limitItems.students)
        .skip(page * RenderControllers.limitItems.students - RenderControllers.limitItems.students),
      ])
      const queryData = {
        campus: campusResult,
        clubs: clubsResult,
        students: studentsResult
      }
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      }
      const validationMessage = {

      }
      res.status(200).render('admin/manage/students', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/admin-accounts
   * @function adminAccounts
   * @typedef management
   */
  
  public async adminAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const page = parseInt(req.query.page as string) || 1;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Tài khoản Admin | PDP Greenwich Vietnam',
        account: 'active',
        heading: 'Tài khoản Admin',
      }
      const [campusResult, clubsResult, adminResult] = await Promise.all([
        Campus.find({}), Club.find({}),
        AdminAccount.find({})
        .populate('campus')
        .populate('editor')
        .limit(RenderControllers.limitItems.adminAccount)
        .skip(page * RenderControllers.limitItems.adminAccount - RenderControllers.limitItems.adminAccount),
      ])
      const queryData = {
        campus: campusResult,
        clubs: clubsResult,
        adminAccount: adminResult,
      } 
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      }
      const validationMessage = {
        modalshow: req.flash('modalAdminAccount')[0]
      }
      res.status(200).render('admin/manage/account', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage,
        validationMessage
      });
    } catch (error) {
      console.table(error);
    }
  }

  /**
   * [GET] /admin/leader-accounts
   * @function leaderAccounts
   */

  public async leaderAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!
      const page = parseInt(req.query.page as string) || 1;
      const files = RenderControllers.injectionAssets
      const infoPage = {
        title: 'Tài khoản Leader | PDP Greenwich Vietnam',
        account: 'active',
        heading: 'Tài khoản Leader',
      }
      const [campusResult, clubsResult, leaderResult] = await Promise.all([
        Campus.find({}), Club.find({}),
        LeaderAccount.find({})
        .populate('campus')
        .populate('club')
        .populate('editor')
        .limit(RenderControllers.limitItems.leaderAccount)
        .skip(page * RenderControllers.limitItems.leaderAccount - RenderControllers.limitItems.leaderAccount),
      ])
      const queryData = {
        campus: campusResult,
        clubs: clubsResult,
        leaderAccount: leaderResult,
      } 
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      }
      const validationMessage = {
        modalshow: req.flash('modalLeaderAccount')[0]
      }
      res.status(200).render('admin/manage/account', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage,
        validationMessage
      });
    } catch (error) {
      console.table(error)
    }
  }
}

export default new RenderControllers();
