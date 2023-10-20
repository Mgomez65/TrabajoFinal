import { Request, Response } from "express";
import { CustomerService } from "../services/customer.services";
import { HttpResponse } from "../../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class CustomerController {
    constructor(
        private readonly CustomerService: CustomerService = new CustomerService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async getCustomer(req: Request, res: Response) {
        try {
            const data = await this.CustomerService.findAllCustomer();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existe dato");
        }
        res.render("customer", { data });
        } catch (e) {
        console.error(e);
        return this.httpResponse.Error(res, e);
        }
    }

    async getCustomerByID(req: Request, res: Response) {
        let { id } = req.query;
        id = id?.toString() || "";
        try {
            const data = await this.CustomerService.findCustomerById(id);
            if (!data) {
            return this.httpResponse.NotFound(res, "No existe dato");
            }
            return res.render("edit", {customer: data,});
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);}
    }

    async createCustomer(req: Request, res: Response) {
        try {
            const data = await this.CustomerService.createCustomer(req.body);
            res.render("index");
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async updateCustomer(req: Request, res: Response) {
        const { id } = req.body;
        try {
            const data: UpdateResult = await this.CustomerService.updateCustomer(
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

    async deleteCustomer(req: Request, res: Response) {
        const { id } = req.body;
        try {
        const data: DeleteResult = await this.CustomerService.deleteCustomer(id);
        if (!data.affected) {
            return this.httpResponse.NotFound(res, "Hay un error en borrar");
        }
        res.render("index");
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);}
    }
}