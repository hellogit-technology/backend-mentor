import { Request, Response, NextFunction } from 'express';
import path from 'path'
import {AccountSession} from '../../../types/Passport'
import { injectFile } from '../../../utils/inject';
import {LeaderAccount, Club} from '../../models'
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
  }

  /**
   * @constant injectionAssets: Get file name
   */

  private static readonly injectionAssets = {
    cssFile: injectFile(RenderControllers.defaultDir.css, 'global'),
    jsFile: injectFile(RenderControllers.defaultDir.js, 'global')
  }

  /**
   * @function dashboard Render leader dashboard page
   * @method GET /club/dashboard
   */
  
  public dashboard = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const leaderAccountResult = await LeaderAccount.findById(accountSession.userId)
      const clubResult = await Club.findById(leaderAccountResult?.club)
      const infoPage = {
        title: `Trang chủ | ${clubResult?.name}`,
        dashboard: 'active',
        heading: 'Trang chủ'
      };
      const queryData = {
        club: clubResult
      }
      res.status(200).render('leader/dashboard', {
        layout: 'layouts/leader/index',
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
   * @function scores Render leader scores page
   * @method GET /club/scores
   */
  
  public inputScores = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const leaderAccountResult = await LeaderAccount.findById(accountSession.userId)
      const clubResult = await Club.findById(leaderAccountResult?.club)
      const infoPage = {
        title: `Điểm số | ${clubResult?.name}`,
        inputScores: 'active',
        scoresMenu: {
          main: 'hover show',
          sub: 'show'
        },
        heading: 'Nhập điểm số'
      };
      const queryData = {
        club: clubResult
      }
      res.status(200).render('leader/manage/scores', {
        layout: 'layouts/leader/index',
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
   * 
   */

  public historyScores = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const leaderAccountResult = await LeaderAccount.findById(accountSession.userId)
      const clubResult = await Club.findById(leaderAccountResult?.club)
      const infoPage = {
        title: `Điểm số | ${clubResult?.name}`,
        historyScores: 'active',
        scoresMenu: {
          main: 'hover show',
          sub: 'show'
        },
        heading: 'Lịch sử điểm số'
      };
      const queryData = {
        club: clubResult
      }
      res.status(200).render('leader/manage/scores', {
        layout: 'layouts/leader/index',
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
   * @function profile Render club profile page
   * @method GET /club/profile
   */

  public profile = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const leaderAccountResult = await LeaderAccount.findById(accountSession.userId)
      const clubResult = await Club.findById(leaderAccountResult?.club)
      const infoPage = {
        title: 'Câu lạc bộ | Club Greenwich Vietnam',
        profile: 'active',
        clubMenu: {
          main: 'hover show',
          sub: 'show'
        },
        heading: 'Thông tin câu lạc bộ',
      }
      const queryData = {
        club: clubResult
      }
      res.status(200).render('leader/profile', {
        layout: 'layouts/leader/index',
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
   * 
   * @function tutorial Render leader tutorial page
   * @method GET /club/tutorial
   */

  public tutorial = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const accountSession: AccountSession = req.user!;
      const files = RenderControllers.injectionAssets;
      const leaderAccountResult = await LeaderAccount.findById(accountSession.userId)
      const clubResult = await Club.findById(leaderAccountResult?.club)
      const infoPage = {
        title: `Hướng dẫn | ${clubResult?.name}`,
        tutorial: 'active',
        heading: 'Hướng dẫn'
      }
      const queryData = {
        club: clubResult
      }
      res.status(200).render('leader/tutorial', {
        layout: 'layouts/leader/index',
        files,
        accountSession,
        infoPage,
        queryData
      });
    } catch (error) {
      printErrorLog(error)
    }
  }
}

export default new RenderControllers();
