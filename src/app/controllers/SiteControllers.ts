import { Request, Response, Router } from 'express';

class SiteControllers {
  public router = Router();

  constructor() {
    this.router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/login', this.login);
    this.router.get('/', this.redirectRoute);
  }

  private login = async (req: Request, res: Response) => {
    try {
      const payload = {
        title: 'Đăng nhập | PDP Greenwich Vietnam',
        heading: 'Đăng nhập',
        messages: req.flash('message')[0]
      }
      res.status(200).render('pages/login', { layout: false, payload });
    } catch (error) {
      res.status(500).render('pages/500', { layout: false })
    }
  };

  private redirectRoute = (req: Request, res: Response) => {
    res.redirect('/login');
  };
}

export default new SiteControllers();
