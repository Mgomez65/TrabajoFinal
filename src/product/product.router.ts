import { ExplainVerbosity } from "typeorm";
import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controllers";

export class purchaseRouter extends BaseRouter<ProductController>{
    constructor(){
        super(ProductController);
    }
routes(): void {
    this.router.get("/product",(req,res) => this.controller.getProduct(req,res));
    this.router.get("/product", (req, res) => this.controller.getProductById(req, res) );
    this.router.post("/createProduct",(req,res)=>this.controller.createProduct(req,res) );
    this.router.post("/updateProduct",(req,res ) => this.controller.updateProduct(req,res));
    this.router.post("/deleteProduct",(req,res ) => this.controller.deleteProduct(req,res));
    }
}
