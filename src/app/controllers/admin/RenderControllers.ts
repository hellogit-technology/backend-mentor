import { Request, Response, NextFunction } from 'express';
import { injectFile } from '../../../utils/inject';
import path from 'path';
import { Campus, Event, Club, AdminAccount, LeaderAccount, Student } from '../../models';
import { AccountSession } from '../../../types/Passport';
import {InfoPage} from '../../../types/Render'
import {QueryOptions} from 'mongoose'
import {printErrorLog, printLog} from '../../../utils/makeUp'

/**
 * @description Render ejs and assets for client (Server-side rendering)
 * @author Merlin Le
 */

class RenderControllers {
  
  /**
   * @constant defaultDir: Get assets relative path
   */

  private static readonly defaultDir = {
    css: path.join(__dirname, '../../../../public/css'),
    js: path.join(__dirname, '../../../../public/js')
  };

  /**
   *  @constant injectionAssets: Get file name 
   */

  private static readonly injectionAssets = {
    cssFile: injectFile(RenderControllers.defaultDir.css, 'global'),
    cssValidation: injectFile(RenderControllers.defaultDir.css, 'validation'),
    cssToast: injectFile(RenderControllers.defaultDir.css, 'toast'),
    jsFile: injectFile(RenderControllers.defaultDir.js, 'global'),
    jsValidation: injectFile(RenderControllers.defaultDir.js, 'validation'),
    jsHelpers: injectFile(RenderControllers.defaultDir.js, 'helpers'),
    jsToast: injectFile(RenderControllers.defaultDir.js, 'toast')
  };

  /**
   * @constant limitItems: Limit items in pagination
   */

  private static readonly limitItems = {
    clubs: 20,
    events: 20,
    students: 20,
    adminAccount: 20,
    leaderAccount: 20
  };

  /**
   * @function dashboard
   * @method GET /admin/dashboard
   * @description Render admin dashboard page
   */

  public dashboard = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const infoPage = {
        title: 'Trang chủ | PDP Greenwich Vietnam',
        dashboard: 'active',
        heading: 'Trang chủ'
      };
      const [campusResult, clubsResult] = await Promise.all([Campus.find({}), Club.find({})]);
      const queryData = {
        campus: campusResult,
        clubs: clubsResult
      };
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      };
      res.status(200).render('admin/dashboard', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      printErrorLog(error)
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
      const files = RenderControllers.injectionAssets;
      const campus = await Campus.find({});
      res.status(200).render('admin/profile', {
        layout: 'layouts/admin/index',
        files,
        campus
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @function statistics
   * @method GET /admin/statistics
   * @description Render statistics page 
   */

  public statistics = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const files = RenderControllers.injectionAssets;
      const campus = await Campus.find({});
      res.status(200).render('admin/profile', {
        layout: 'layouts/admin/index',
        files,
        campus
      });
    } catch (error) {
      printErrorLog(error)
    }
  }

  /**
   * @function system
   * @method GET /admin/system
   * @description Render system page 
   */

  public async system(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const infoPage = {
        title: 'Hệ thống | PDP Greenwich Vietnam',
        system: 'active',
        heading: 'Hệ thống',
        breadcrumb: [
          {title: 'Trang Chủ', link: '/admin/dashboard'},
          {title: 'Hệ thống tự động', link: '/admin/system'}
        ]
      };
      const [campusResult, clubsResult] = await Promise.all([Campus.find({}), Club.find({})]);
      const queryData = {
        campus: campusResult,
        clubs: clubsResult
      };
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      };
      res.status(200).render('admin/system', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      printErrorLog(error)
    }
  }

  /**
   * @function tutorial
   * @method GET /admin/tutorial
   * @description Render admin tutorial page
   */

  public async tutorial(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const infoPage = {
        title: 'Hướng dẫn | PDP Greenwich Vietnam',
        tutorial: 'active',
        heading: 'Hướng dẫn',
        breadcrumb: [
          {title: 'Trang Chủ', link: '/admin/dashboard'},
          {title: 'Câu hỏi thường gặp', link: '/admin/tutorial'}
        ]
      };
      const [campusResult, clubsResult] = await Promise.all([Campus.find({}), Club.find({})]);
      const queryData = {
        campus: campusResult,
        clubs: clubsResult
      };
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      };
      res.status(200).render('admin/tutorial', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      printErrorLog(error)
    }
  }

  /**
   * @function scores
   * @method GET /admin/scores
   * @description Render admin scores page
   */

  public async scores(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const infoPage = {
        title: 'Điểm số | PDP Greenwich Vietnam',
        scores: 'active',
        heading: 'Điểm số',
        breadcrumb: [
          {title: 'Trang Chủ', link: '/admin/dashboard'},
          {title: 'Quản lý điểm số', link: '/admin/scores'}
        ]
      };
      const [campusResult, clubsResult] = await Promise.all([Campus.find({}), Club.find({})]);
      const queryData = {
        campus: campusResult,
        clubs: clubsResult
      };
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      };
      const validationMessage = {};
      res.status(200).render('admin/manage/scores', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      printErrorLog(error)
    }
  }

  /**
   * @function clubs
   * @method GET /admin/clubs
   * @description Render clubs page
   */

  public async clubs(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const page = parseInt(req.query.page as string) || 1;
      const files = RenderControllers.injectionAssets;
      const infoPage = {
        title: 'Câu lạc bộ | PDP Greenwich Vietnam',
        manageClubs: 'active',
        heading: 'Câu lạc bộ',
        clubsMenu: {
          main: 'hover show',
          sub: 'show'
        },
        breadcrumb: [
          {title: 'Trang Chủ', link: '/admin/dashboard'},
          {title: 'Quản lý câu lạc bộ', link: '/admin/clubs'}
        ]
      };
      const [campusResult, clubsResult] = await Promise.all([
        Campus.find({}),
        Club.find({})
          .populate('editor')
          .limit(RenderControllers.limitItems.clubs)
          .skip(page * RenderControllers.limitItems.clubs - RenderControllers.limitItems.clubs)
      ]);
      const queryData = {
        campus: campusResult,
        clubs: clubsResult
      };
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      };
      const validation = {};
      res.status(200).render('admin/manage/clubs', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      printErrorLog(error)
    }
  }

  /**
   * @function clubMembers
   * @method GET /admin/club/:id/:slug
   * @description 
   */

  public async clubMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const infoPage = {
        title: 'Câu lạc bộ | PDP Greenwich Vietnam',
        manageClubs: 'active',
        heading: '',
        clubsMenu: {
          main: 'hover show',
          sub: 'show'
        }
      };
      const queryData = {
        campus: await Campus.find({})
      };
      res.status(200).render('admin/manage/club-members', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
      printErrorLog(error)
    }
  }

  /**
   * @function events
   * @method GET /admin/events
   * @description Render events page
   */

  public async events(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const page = parseInt(req.query.page as string) || 1;
      const files = RenderControllers.injectionAssets;
      const infoPage = {
        title: 'Sự kiện | PDP Greenwich Vietnam',
        events: 'active',
        heading: 'Sự kiện',
        eventsMenu: {
          main: 'hover show',
          sub: 'show'
        },
        breadcrumb: [
          {title: 'Trang Chủ', link: '/admin/dashboard'},
          {title: 'Quản lí sự kiện', link: '/admin/events'}
        ]
      };
      const [campusResult, clubsResult, eventsResult] = await Promise.all([
        Club.find({}),
        Campus.find({}),
        Event.find({})
          .populate('club')
          .populate('campus')
          .populate('editor')
          .limit(RenderControllers.limitItems.events)
          .skip(page * RenderControllers.limitItems.events - RenderControllers.limitItems.events)
      ]);
      const queryData = {
        clubs: clubsResult,
        campus: campusResult,
        eventsSchool: eventsResult
      };
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      };
      const validationMessage = {};
      res.status(200).render('admin/manage/events', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      printErrorLog(error)
    }
  }

  /**
   * @function eventDetail
   * @method GET /admin/event/:id/:slug
   * @description
   */

  public async eventDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const infoPage = {
        title: 'Sự kiện | PDP Greenwich Vietnam',
        events: 'active',
        heading: 'Sự kiện'
      };
      const [campusResult, eventsResult] = await Promise.all([Campus.find({}), Event.find({}).populate('club')]);
      const queryData = {
        campus: campusResult,
        eventsSchool: eventsResult
      };

      // Message
      res.status(200).render('admin/manage/events', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
      printErrorLog(error)
    }
  }

  /**
   * @function students
   * @method GET /admin/students
   * @description Render students page
   */

  public async students(req: Request, res: Response, next: NextFunction) {
    try {
      let searchCondition: QueryOptions
      const accountSession: AccountSession = req.user!;
      const {search} = req.query
      const page = parseInt(req.query.page as string) || 1;
      const limitItem = RenderControllers.limitItems['students']
      const files = RenderControllers.injectionAssets;
      const infoPage: InfoPage = {
        title: 'Sinh viên | PDP Greenwich Vietnam',
        students: 'active',
        heading: 'Sinh viên',
        studentsMenu: {
          main: 'hover show',
          sub: 'show'
        },
        breadcrumb: [
          {title: 'Trang Chủ', link: '/admin/dashboard'},
          {title: 'Quản lí sinh viên', link: '/admin/students'}
        ]
      };
      if(search) {
        infoPage['search'] = {
          searchBox: 'active show',
          queryData: search as string
        }
        const regex = new RegExp(`.*${search as string}.*`, 'i');
        searchCondition = { $or: [{ fullname: regex }, { email: regex }, {schoolId: regex}] }
      } else {
        searchCondition = {}
      }
      const [campusResult, clubsResult, studentsResult] = await Promise.all([
        Campus.find({}),
        Club.find({}),
        Student.find(searchCondition)
          .populate('campus')
          .populate('editor')
          .limit(RenderControllers.limitItems.students)
          .skip(page * RenderControllers.limitItems.students - RenderControllers.limitItems.students)
      ]);
      const queryData = {
        campus: campusResult,
        clubs: clubsResult,
        students: studentsResult,
        totalItem: studentsResult.length,
        itemsOnePage: limitItem,
        pagination: {
          current: page,
          pages: Math.ceil(studentsResult.length / limitItem)
        }
      };
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      };
      const validationMessage = {};
      res.status(200).render('admin/manage/students', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage
      });
    } catch (error) {
      printErrorLog(error)
    }
  }

  /**
   * @function adminAccounts
   * @method GET /admin/admin-accounts
   * @description Render admin accounts page
   */

  public async adminAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      let searchCondition: QueryOptions
      const accountSession: AccountSession = req.user!;
      const {search} = req.query
      const page = parseInt(req.query.page as string) || 1;
      const limitItem = RenderControllers.limitItems['adminAccount']
      const files = RenderControllers.injectionAssets;
      const infoPage: InfoPage = {
        title: 'Tài khoản Admin | PDP Greenwich Vietnam',
        adminAccount: 'active',
        heading: 'Tài khoản Admin',
        accountMenu: {
          main: 'hover show',
          sub: 'show'
        },
        breadcrumb: [
          {title: 'Trang Chủ', link: '/admin/dashboard'},
          {title: 'Quản lí tài khoản Admin', link: '/admin/admin-accounts'}
        ]
      };
      if(search) {
        infoPage['search'] = {
          searchBox: 'active show',
          queryData: search as string
        }
        const regex = new RegExp(`.*${search as string}.*`, 'i');
        searchCondition = { $or: [{ fullname: regex }, { email: regex }] }
      } else {
        searchCondition = {}
      }
      const [campusResult, clubsResult, adminResult] = await Promise.all([
        Campus.find({}),
        Club.find({}),
        AdminAccount.find(searchCondition)
          .populate('campus')
          .populate('editor')
          .limit(RenderControllers.limitItems.adminAccount)
          .skip(page * RenderControllers.limitItems.adminAccount - RenderControllers.limitItems.adminAccount)
      ]);
      const queryData = {
        campus: campusResult,
        clubs: clubsResult,
        adminAccount: adminResult,
        totalItem: adminResult.length,
        itemsOnePage: limitItem,
        pagination: {
          current: page,
          pages: Math.ceil(adminResult.length / limitItem)
        }
      };
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      };
      const validationMessage = {
        modalShow: req.flash('modalAdminAccount')[0]
      };
      res.status(200).render('admin/manage/admin-account', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage,
        validationMessage
      });
    } catch (error) {
      printErrorLog(error)
    }
  }

  /**
   * @function leaderAccounts
   * @method GET /admin/leader-accounts
   * @description Render leader accounts page
   */

  public async leaderAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      let searchCondition: QueryOptions
      const accountSession: AccountSession = req.user!;
      const {search} = req.query
      const page = parseInt(req.query.page as string) || 1;
      const limitItem = RenderControllers.limitItems['leaderAccount']
      const files = RenderControllers.injectionAssets;
      const infoPage: InfoPage = {
        title: 'Tài khoản Leader | PDP Greenwich Vietnam',
        leaderAccount: 'active',
        heading: 'Tài khoản Leader',
        accountMenu: {
          main: 'hover show',
          sub: 'show'
        },
        breadcrumb: [
          {title: 'Trang Chủ', link: '/admin/dashboard'},
          {title: 'Quản lí tài khoản Leader', link: '/admin/leader-accounts'}
        ]
      };
      if(search) {
        infoPage['search'] = {
          searchBox: 'active show',
          queryData: search as string
        }
        const regex = new RegExp(`.*${search as string}.*`, 'i')
        searchCondition = { $or: [{ fullname: regex }, { email: regex }, {schoolId: regex}] }
      } else {
        searchCondition = {}
      }
      const [campusResult, clubsResult, leaderResult] = await Promise.all([
        Campus.find({}),
        Club.find({}),
        LeaderAccount.find(searchCondition)
          .populate('campus')
          .populate('club')
          .populate('editor')
          .limit(RenderControllers.limitItems.leaderAccount)
          .skip(page * RenderControllers.limitItems.leaderAccount - RenderControllers.limitItems.leaderAccount)
      ]);
      const queryData = {
        campus: campusResult,
        clubs: clubsResult,
        leaderAccount: leaderResult,
        totalItem: leaderResult.length,
        itemsOnePage: limitItem,
        pagination: {
          current: page,
          pages: Math.ceil(leaderResult.length / limitItem)
        }
      };
      const toastMessage = {
        result: req.flash('result')[0],
        message: req.flash('message')[0]
      };
      const validationMessage = {
        modalshow: req.flash('modalLeaderAccount')[0]
      };
      res.status(200).render('admin/manage/leader-account', {
        layout: 'layouts/admin/index',
        files,
        accountSession,
        infoPage,
        queryData,
        toastMessage,
        validationMessage
      });
    } catch (error) {
      printErrorLog(error)
    }
  }
}

export default new RenderControllers();
