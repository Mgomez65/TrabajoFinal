import { ExplainVerbosity } from "typeorm";
import { BaseRouter } from "../shared/router/router";
import { CustomerController } from "./controllers/customer.controller";

export class purchaseRouter extends BaseRouter<CustomerController>{
    constructor(){
        super(CustomerController);
    }
    routes(): void {
    this.router.get("/product",(req,res) => this.controller.getCustomer(req,res));
    this.router.get("/product", (req, res) => this.controller.getCustomerByID(req, res) );
    this.router.post("/createProduct",(req,res)=>this.controller.createCustomer(req,res) );
    this.router.post("/updateProduct",(req,res ) => this.controller.updateCustomer(req,res));
    this.router.post("/deleteProduct",(req,res ) => this.controller.deleteCustomer(req,res));
    }
}