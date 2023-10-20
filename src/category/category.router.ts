import { BaseRouter } from "../shared/router/router";
import { categoryController } from "./controllers/category.controller";
export class categoryRouter extends BaseRouter<categoryController> {
    constructor() {
    super(categoryController);
    
    }
routes(): void {
    this.router.get("/category",(req,res) => this.controller.getCategory(req,res));
    this.router.get("/category", (req, res) => this.controller.getCategoryById(req, res) );
    this.router.post("/createCategory",(req,res)=>this.controller.createCategory(req,res) );
    this.router.post("/updateCategory",(req,res ) => this.controller.updateCategory(req,res));
    this.router.post("/deleteCategory",(req,res ) => this.controller.deleteCategory(req,res));
    }
}
