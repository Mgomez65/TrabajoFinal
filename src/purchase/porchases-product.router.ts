import { ExplainVerbosity } from "typeorm";
import { BaseRouter } from"../shared/router/router";
import { purchaseProductController } from "./controllers/purchase-Prodcut.controller";

export class purchaseRouter extends BaseRouter<purchaseProductController>{
    constructor(){
        super(purchaseProductController);
    }
routes(): void {
    this.router.get("/purchasesProduct",(req,res) => this.controller.getPurchasesProducts);
    this.router.get("/purchasesProdcut", (req, res) => this.controller.getPurchasesProducts(req, res) );
    this.router.post("/createPurchasesPrduct",(req,res)=>this.controller.createPurchaseProduct(req,res) );
    this.router.post("/updatepurchaseProduct",(req,res ) => this.controller.updatepurchaseProduct(req,res));
    this.router.post("/deletepurchaseProduct",(req,res ) => this.controller.deletepurchaseProduct(req,res));
    }
}