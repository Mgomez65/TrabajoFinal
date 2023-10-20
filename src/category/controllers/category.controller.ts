import { Request, Response } from "express"
import { CategoryService } from "../services/category.service";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";

export class categoryController{
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

    async getCategory(req:Request,res:Response){
      try {
        const users = await this.categoryService.findAllCategory();
        if (users.length === 0) {
          return this.httpResponse.NotFound(res, "No existe el datos");
        }
        // this.httpResponse.Ok(res, users);
        res.render("users", { users });
      } catch (e) {
        return this.httpResponse.Error(res, e);
      }
    }
    async getCategoryById(req: Request, res: Response) {
      let { id } = req.query;
      id = id?.toString() || "";
      try {
          const data = await this.categoryService.getCategoryById();
          if (!data) {
          return this.httpResponse.NotFound(res, "No existe dato");
          }
          return res.render("edit", {product: data,});
      } catch (e) {
          console.error(e);
          return this.httpResponse.Error(res, e);}
  }

  async createCategory(req: Request, res: Response) {
      try {
          const data = await this.categoryService.CreateCategory(req.body);
          res.render("index");
      } catch (e) {
          console.error(e);
          return this.httpResponse.Error(res, e);
      }
  }

  async updateCategory(req: Request, res: Response) {
      const { id } = req.body;
      try {
          const data: UpdateResult = await this.categoryService.updateCategory(
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

  async deleteCategory(req: Request, res: Response) {
      const { id } = req.body;
      try {
      const data: DeleteResult = await this.categoryService.deleteAllCategory(id);
      if (!data.affected) {
          return this.httpResponse.NotFound(res, "Hay un error en borrar");
      }
      res.render("index");
      } catch (e) {
          console.error(e);
          return this.httpResponse.Error(res, e);}
      };
}
