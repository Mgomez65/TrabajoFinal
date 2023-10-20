import { BaseRouter } from "../shared/router/router";
import { UserController } from "./controllers/user.controller";
export class categoryRouter extends BaseRouter<UserController> {
    constructor() {
    super(categoryController);
    
    }
}
