import { Request, Response } from "express";
import { productService } from "../services/product.services";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";


export class ProductController {
    constructor(
        private readonly productService: productService = new productService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async getProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.findAllProduct();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existe dato");
        }
        res.render("product", { data });
        } catch (e) {
        console.error(e);
        return this.httpResponse.Error(res, e);
        }
    }

    async getProductById(req: Request, res: Response) {
        let { id } = req.query;
        id = id?.toString() || "";
        try {
            const data = await this.productService.findProductByid(id);
            if (!data) {
            return this.httpResponse.NotFound(res, "No existe dato");
            }
            return res.render("edit", {product: data,});
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);}
    }

    async createProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body);
            res.render("index");
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.body;
        try {
            const data: UpdateResult = await this.productService.updateProduct(
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

    async deleteProduct(req: Request, res: Response) {
        const { id } = req.body;
        try {
        const data: DeleteResult = await this.productService.deleteProduct(id);
        if (!data.affected) {
            return this.httpResponse.NotFound(res, "Hay un error en borrar");
        }
        res.render("index");
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);}
    }
}