import { HttpResponse } from "../../shared/response/http.response"
import { purchaseProductService } from "../services/purchase-product.service" 
import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";

export class purchaseProductController {
    constructor(
        private readonly PurchaseProductService: purchaseProductService = new purchaseProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
        ){}
    
    async getPurchasesProducts(req: Request,res:Response){
        try {
            const users = await this.PurchaseProductService.findAllPurchaseProduct();
            if (users.length === 0) {
                return this.httpResponse.NotFound(res, "No existe el datos");
            }
            // this.httpResponse.Ok(res, users);
            res.render("pruchase Product", { users });
            } catch (e) {
                return this.httpResponse.Error(res, e);
        }
    }

    async getUserById(req: Request, res: Response) {
        let { id } = req.query;
        id = id?.toString() || "";
        try {
            const data = await this.PurchaseProductService.findPurchaseProductByid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos");
            }
          // return this.httpResponse.Ok(res, data);
        return res.render("edit", {
            user: data,
        });
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async createPurchaseProduct (req: Request, res: Response){
        try{
            const data = await this.PurchaseProductService.createPurchaseProduct(req.body);
            res.render("index");
        }catch(e){
            return this.httpResponse.Error(res,e);
        }   
    }

    async updatepurchaseProduct(req:Request,res:Response){
        const {id} = req.body;
        
        try{
            const data: UpdateResult = await this.PurchaseProductService.updatePurchaseProdcut(id,req.body);
            if (!data.affected){
                return this.httpResponse.NotFound(res,"Hay un error en actualizar Al actualizar")
            }
            return this.httpResponse.Ok(res, data);
        }catch(e){
            return this.httpResponse.Error(res,e);
        }
    }

    async deletepurchaseProduct (req: Request, res: Response){
        const { id } = req.body;
        try {
            const data: DeleteResult = await this.PurchaseProductService.deletePurchaseProdcut(id)
            if (!data.affected){
                return this.httpResponse.NotFound(res,"Hay un error en actualizar Al actializar")
            }
            res.render("index");

        }catch(e){
            return this.httpResponse.Error(res,e);
        }
    }
}