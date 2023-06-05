import { Request, Response, Router } from 'express';

class ExceptionControllers {
  public router = Router();

  constructor() {
    this.router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('*', this.show404);
  }

  private show404 = (req: Request, res: Response) => {
    res.status(404).render('pages/404', { layout: false });
  };
}

export default new ExceptionControllers();
