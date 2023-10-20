import { ExplainVerbosity } from "typeorm";
import { BaseRouter } from "../shared/router/router";
import { PurchaseController } from "./controllers/purchase-controller";

export class purchaseRouter extends BaseRouter<PurchaseController>{
    constructor(){
        super(PurchaseController);
    }
routes(): void {
    this.router.get("/purchases",(req,res) => this.controller.getPurchases(req,res));
    this.router.get("/purchases", (req, res) => this.controller.getPurchaseById(req, res) );
    this.router.post("/createPurchases",(req,res)=>this.controller.createPurchase(req,res) );
    this.router.post("/updatePurchase",(req,res ) => this.controller.updatePurchase(req,res));
    this.router.post("/deletePurchase",(req,res ) => this.controller.deletePurchase(req,res));
    }
}
