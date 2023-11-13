import { BaseRouter } from "../shared/router/router";
import { UserController } from "./controllers/UserController";
export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get("/", (req, res) => {
      res.render("index");
    });

    this.router.get("/register", (req, res) => {
      res.render("register");
    });
    this.router.get("/users", (req, res) => 
      this.controller.getUsers(req, res)
    );
    
    this.router.get("/user", (req, res) =>
      this.controller.getUserById(req, res)
    );

    this.router.get("/add", (req, res) => {
      res.render("add");
    });

    this.router.post("/createUser", (req, res) =>
      this.controller.createUser(req, res)
    );

    this.router.get("/search",(req,res)=>{
      this.controller.search(req,res)
    });

    this.router.post("/updateUser", (req, res) =>
      this.controller.updateUser(req, res)
    );

    this.router.post("/deleteUser", (req, res) =>
      this.controller.deleteUser(req, res)
    )
    this.router.post("/userGmail", (req, res) =>
      this.controller.getUserBygmail(req, res)
    );
  }
}