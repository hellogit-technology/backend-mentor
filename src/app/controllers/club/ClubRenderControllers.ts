import { Request, Response, Router } from 'express';
import { IAccountSession } from '../../../interface/ISession';
import { ClubAccount, Club } from '../../models';

/**
 * @description Render ejs and assets for client (Server-side rendering)
 * @author Merlin Le
 */

class RenderControllers {
  public router = Router();

  constructor() {
    this.router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/dashboard', this.dashboard);
    this.router.get('/input-scores', this.inputScores);
    this.router.get('/history-scores', this.historyScores);
    this.router.get('/members', this.membersClub);
    this.router.get('/information', this.infoClub);
    this.router.get('/tutorial', this.tutorial);
    this.router.get('/', (req: Request, res: Response) => {
      res.redirect('/club/dashboard');
    });
  }

  /**
   * @constant defaultDir: Get assets relative path
   */

  // private static readonly defaultDir = {
  //   css: path.join(__dirname, '../../../../public/css'),
  //   js: path.join(__dirname, '../../../../public/js')
  // };

  /**
   * @constant injectionAssets: Get file name
   */

  // private static readonly injectionAssets = {
  //   cssFile: injectFile(RenderControllers.defaultDir.css, 'global'),
  //   jsFile: injectFile(RenderControllers.defaultDir.js, 'global')
  // };

  /**
   * @function dashboard Render leader dashboard page
   * @method GET /club/dashboard
   */

  public dashboard = async (req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const leaderAccountResult = await ClubAccount.findById(accountSession.userId);
      const clubResult = await Club.findById(leaderAccountResult?.club);
      const infoPage = {
        title: `Trang chủ | ${clubResult?.name}`,
        dashboard: 'active',
        heading: 'Trang chủ'
      };
      const queryData = {
        club: clubResult
      };
      res.status(200).render('leader/dashboard', {
        layout: 'layouts/leader/index',
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
      
    }
  };

  /**
   * @function scores Render leader input scores page
   * @method GET /club/input-scores
   */

  public inputScores = async (req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const leaderAccountResult = await ClubAccount.findById(accountSession.userId);
      const clubResult = await Club.findById(leaderAccountResult?.club);
      const infoPage = {
        title: `Điểm số | ${clubResult?.name}`,
        inputScores: 'active',
        scoresMenu: {
          main: 'hover show',
          sub: 'show'
        },
        heading: 'Nhập điểm số',
        breadcrumb: [
          { title: 'Trang chủ', link: '/club/dashboard' },
          { title: 'Nhập điểm số', link: '/club/input-scores' }
        ]
      };
      const queryData = {
        club: clubResult
      };
      res.status(200).render('leader/manage/input-scores', {
        layout: 'layouts/leader/index',
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
     
    }
  };

  /**
   * @function historyScores Render leader history scores page
   * @method GET /club/history-scores
   */

  public historyScores = async (req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const leaderAccountResult = await ClubAccount.findById(accountSession.userId);
      const clubResult = await Club.findById(leaderAccountResult?.club);
      const infoPage = {
        title: `Điểm số | ${clubResult?.name}`,
        historyScores: 'active',
        scoresMenu: {
          main: 'hover show',
          sub: 'show'
        },
        heading: 'Lịch sử điểm số',
        breadcrumb: [
          { title: 'Trang chủ', link: '/club/dashboard' },
          { title: 'Lịch sử điểm số', link: '/club/history-scores' }
        ]
      };
      const queryData = {
        club: clubResult
      };
      res.status(200).render('leader/manage/history-scores', {
        layout: 'layouts/leader/index',
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
   
    }
  };

  /**
   * @function profile Render club information page
   * @method GET /club/information
   */

  public infoClub = async (req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const leaderAccountResult = await ClubAccount.findById(accountSession.userId);
      const clubResult = await Club.findById(leaderAccountResult?.club).populate('campus');
      const infoPage = {
        title: 'Câu lạc bộ | Club Greenwich Vietnam',
        infoClub: 'active',
        clubMenu: {
          main: 'hover show',
          sub: 'show'
        },
        heading: 'Thông tin câu lạc bộ',
        breadcrumb: [
          { title: 'Trang Chủ', link: '/club/dashboard' },
          { title: 'Thông tin câu lạc bộ', link: '/club/information' }
        ]
      };
      const queryData = {
        club: clubResult
      };
      res.status(200).render('leader/manage/info-club', {
        layout: 'layouts/leader/index',
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
   
    }
  };

  /**
   * @function membersClub Render club members page
   * @method GET /club/members
   */

  public membersClub = async (req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const leaderAccountResult = await ClubAccount.findById(accountSession.userId);
      const clubResult = await Club.findById(leaderAccountResult?.club);
      const infoPage = {
        title: 'Câu lạc bộ | Club Greenwich Vietnam',
        membersClub: 'active',
        clubMenu: {
          main: 'hover show',
          sub: 'show'
        },
        heading: 'Quản lý thành viên câu lạc bộ'
      };
      const queryData = {
        club: clubResult
      };
      res.status(200).render('leader/manage/members', {
        layout: 'layouts/leader/index',
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {

    }
  };

  /**
   *
   * @function tutorial Render leader tutorial page
   * @method GET /club/tutorial
   */

  public tutorial = async (req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const leaderAccountResult = await ClubAccount.findById(accountSession.userId);
      const clubResult = await Club.findById(leaderAccountResult?.club);
      const infoPage = {
        title: `Hướng dẫn | ${clubResult?.name}`,
        tutorial: 'active',
        heading: 'Hướng dẫn'
      };
      const queryData = {
        club: clubResult
      };
      res.status(200).render('leader/tutorial', {
        layout: 'layouts/leader/index',
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
 
    }
  };
}

export default new RenderControllers();
