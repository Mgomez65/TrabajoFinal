import { Request, Response } from "express";
import { purchaseService} from "../services/purchase.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class PurchaseController {
    constructor(
        private readonly purchaseService: purchaseService = new purchaseService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async getPurchases(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.findAllPurchase();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existe dato");
        }
        res.render("purchase", { data });
        } catch (e) {
        console.error(e);
        return this.httpResponse.Error(res, e);
        }
    }

    async getPurchaseById(req: Request, res: Response) {
        let { id } = req.query;
        id = id?.toString() || "";
        try {
            const data = await this.purchaseService.findPurchaseByid(id);
            if (!data) {
            return this.httpResponse.NotFound(res, "No existe dato");
            }
            return res.render("edit", {purchase: data,});
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);}
    }

    async createPurchase(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.createPurchase(req.body);
            res.render("index");
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async updatePurchase(req: Request, res: Response) {
        const { id } = req.body;
        try {
            const data: UpdateResult = await this.purchaseService.updatePurchase(
            id,
            req.body);
            if (!data.affected) {
            return this.httpResponse.NotFound(res, "Hay un error en actualizar");
        }
        return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async deletePurchase(req: Request, res: Response) {
        const { id } = req.body;
        try {
        const data: DeleteResult = await this.purchaseService.deletePurchase(id);
        if (!data.affected) {
            return this.httpResponse.NotFound(res, "Hay un error en borrar");
        }
        res.render("index");
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);}
    }
}