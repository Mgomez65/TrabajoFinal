import { Router } from "express";

export class BaseRouter<T> {
  public router: Router;
  public controller: T;
  //public middleware: U
  constructor(TController: { new (): T }) {
    this.router = Router();
    this.controller = new TController();
    this.routes();
  }

  routes() {}
}

/*import { Router } from "express";

export class BaseRouter<T, U> {
  public router: Router;
  public controller: T;
  public middleware: U
  constructor(TController: { new (): T }, UMiddleware: { new (): U}) {
    this.router = Router();
    this.controller = new TController();
    this.middleware = new UMiddleware();
    this.routes();
  }

  routes() {}
}*/