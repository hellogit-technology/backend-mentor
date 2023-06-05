import { Request, Response, Router } from 'express';

class ClubHandlerControllers {
  public router = Router();

  constructor() {
    this.router;
    this.initRoutes();
  }

  private initRoutes() {}
}

export default new ClubHandlerControllers();
