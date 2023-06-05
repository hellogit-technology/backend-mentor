import { Request, Response, Router } from 'express';
import { Campus, Event, Club } from '../../models';
import { IAccountSession } from '../../../interface/ISession';

class RenderControllers {
  public router = Router();

  constructor() {
    this.router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/dashboard', this.dashboard);
    this.router.get('/system', this.system);
    this.router.get('/tutorial', this.tutorial);
    this.router.get('/profile', this.profile);
    this.router.get('/scores/overview', this.overviewScores)
    this.router.get('/scores', this.manageScores);
    this.router.get('/overview-accounts', this.overviewAccounts)
    this.router.get('/club-accounts', this.clubAccounts);
    this.router.get('/admin-accounts', this.adminAccounts);
    this.router.get('/clubs/overview', this.overviewClubs)
    this.router.get('/clubs', this.manageClubs);
    this.router.get('/club/:slug', this.clubMembers);
    this.router.get('/events/overview', this.overviewEvents)
    this.router.get('/events', this.manageEvents);
    this.router.get('/students/overview', this.overviewStudents)
    this.router.get('/students', this.manageStudents);
    this.router.get('/', (req: Request, res: Response) => {
      res.redirect('/admin/dashboard');
    });
  }

  private responseError = (res: Response) => {
    return res.status(500).render('pages/500', {layout: false})
  } 

  // Dashboard Page
  private dashboard = async (req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const [campusResult, clubsResult] = await Promise.all([Campus.find(), Club.find()]);
      const payload = {
        infoPage: {
          title: 'Trang chủ | PDP Greenwich Vietnam',
          heading: 'Trang chủ',
          dashboard: true
        }, 
        queryData: {
          campus: campusResult,
          club: clubsResult
        }
      }
      res.status(200).render('pages/admin/dashboard', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  };

  // Profile Page
  private profile = async(req: Request, res: Response) => {
    try {
      res.status(200).render('pages/profile', {
        layout: 'layouts/admin',
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // System Page
  private system = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const payload = {
        infoPage: {
          title: 'Hệ thống | PDP Greenwich Vietnam',
          system: true,
          heading: 'Hệ thống'
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Hệ thống tự động', link: '/admin/system' }
        ]
      }
      
      res.status(200).render('pages/admin/system', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Tutorial Page
  private tutorial = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const payload = {
        infoPage : {
          title: 'Hướng dẫn | PDP Greenwich Vietnam',
          tutorial: true,
          heading: 'Hướng dẫn',
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Câu hỏi thường gặp', link: '/admin/tutorial' }
        ]
      }
  
      res.status(200).render('pages/admin/tutorial', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Overview Scores Page
  private overviewScores = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const payload = {
        infoPage: {
          title: 'Điểm số | PDP Greenwich Vietnam',
          overviewScores: true,
          heading: 'Điểm số'
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Tổng quan điểm số', link: '/admin/scores/overview' }
        ]
      }
      res.status(200).render('pages/admin/scores/overview', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Manage Scores Page
  private manageScores = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const [campusResult, clubsResult] = await Promise.all([Campus.find(), Club.find()]);
      const payload = {
        infoPage: {
          title: 'Điểm số | PDP Greenwich Vietnam',
          manageScores: true,
          heading: 'Điểm số'
        },
        queryData: {
          campus: campusResult,
          club: clubsResult
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Quản lý điểm số', link: '/admin/scores' }
        ]
      }
     
      res.status(200).render('pages/admin/scores/manage', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Overview Club Page
  private overviewClubs =  async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const payload = {
        infoPage: {
          title: 'Câu lạc bộ | PDP Greenwich Vietnam',
          overviewClub: true,
          heading: 'Câu lạc bộ'
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Tổng quan câu lạc bộ', link: '/admin/clubs/overview' }
        ]
      }
      res.status(200).render('pages/admin/club/overview', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Manage Club Page
  private manageClubs = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const campusResult = await Campus.find()
      const payload = {
        infoPage: {
          title: 'Câu lạc bộ | PDP Greenwich Vietnam',
          manageClub: true,
          heading: 'Câu lạc bộ',
        },
        queryData: {
          campus: campusResult
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Quản lý câu lạc bộ', link: '/admin/clubs' }
        ]
      }
    
      res.status(200).render('pages/admin/club/manage', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  /**
   * @function clubMembers
   * @method GET /admin/club/:id/:slug
   * @description
   */

  private clubMembers = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const infoPage = {
        title: 'Câu lạc bộ | PDP Greenwich Vietnam',
        heading: '',
      };
      const queryData = {
        campus: await Campus.find()
      };
      res.status(200).render('admin/manage/club-members', {
        layout: 'layouts/admin/index',
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Overview Event Page
  private overviewEvents = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const payload = {
        infoPage: {
          title: 'Sự kiện | PDP Greenwich Vietnam',
          overviewEvent: true,
          heading: 'Sự kiện'
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Tổng quan sự kiện', link: '/admin/events/overview' }
        ]
      }
      res.status(200).render('pages/admin/event/overview', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Event Page
  private manageEvents = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const [campusResult, clubsResult] = await Promise.all([
        Club.find(),
        Campus.find(),
      ]);
      
      const payload = {
        infoPage: {
          title: 'Sự kiện | PDP Greenwich Vietnam',
          manageEvent: true,
          heading: 'Sự kiện'
        },
        queryData: {
          club: clubsResult,
          campus: campusResult
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Quản lí sự kiện', link: '/admin/events' }
        ]
      }

      res.status(200).render('pages/admin/event/manage', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  /**
   * @function eventDetail
   * @method GET /admin/event/:id/:slug
   * @description
   */

  private eventDetail = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const [campusResult, eventsResult] = await Promise.all([Campus.find({}), Event.find({}).populate('club')]);
      const payload = {
        infoPage: {
          title: 'Sự kiện | PDP Greenwich Vietnam',
          heading: 'Sự kiện'
        },
        queryData: {
          campus: campusResult,
          eventsSchool: eventsResult
        }
      }

      res.status(200).render('admin/manage/events', {
        layout: 'layouts/admin/index',
        accountSession,
        payload
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Overview Student Page
  private overviewStudents = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const payload = {
        infoPage: {
          title: 'Sinh viên | PDP Greenwich Vietnam',
          overviewStudent: true,
          heading: 'Sinh viên'
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Tổng quan sinh viên', link: '/admin/students/overview' }
        ]
      }
      res.status(200).render('pages/admin/student/overview', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Manage Student Page
  private manageStudents = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const payload = {
        infoPage: {
          title: 'Sinh viên | PDP Greenwich Vietnam',
          manageStudent: true,
          heading: 'Sinh viên'
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Quản lí sinh viên', link: '/admin/students' }
        ]
      }

      res.status(200).render('pages/admin/student/manage', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Overview Account Page
  private overviewAccounts = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const payload = {
        infoPage: {
          title: 'Tài khoản | PDP Greenwich Vietnam',
          overviewAccount: true,
          heading: 'Tài khoản'
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Tổng quan tài khoản', link: '/admin/overview-accounts' }
        ]
      }
      res.status(200).render('pages/admin/account/overview', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Admin Account Page
  private adminAccounts = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const campusResult = await Campus.find()
      const payload = {
        infoPage: {
          title: 'Tài khoản Admin | PDP Greenwich Vietnam',
          adminAccount: true,
          heading: 'Tài khoản Admin',
        }, 
        queryData: {
          campus: campusResult,
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Quản lí tài khoản Admin', link: '/admin/admin-accounts' }
        ]
      }
      
      res.status(200).render('pages/admin/account/admin-account', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }

  // Club Account Page
  private clubAccounts = async(req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!
      const [campusResult, clubsResult] = await Promise.all([
        Campus.find(), 
        Club.find()
      ]);
      const payload = {
        infoPage: {
          title: 'Tài khoản Club | PDP Greenwich Vietnam',
          clubAccount: true,
          heading: 'Tài khoản Club',
        },
        queryData: {
          campus: campusResult,
          club: clubsResult
        },
        breadcrumb: [
          { title: 'Trang Chủ', link: '/admin/dashboard' },
          { title: 'Quản lí tài khoản Club', link: '/admin/club-accounts' }
        ]
      }
      
      res.status(200).render('pages/admin/account/club-account', {
        layout: 'layouts/admin',
        accountSession,
        payload
      });
    } catch (error) {
      this.responseError(res)
    }
  }
}

export default new RenderControllers();
