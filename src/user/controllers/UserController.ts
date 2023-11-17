import { Express, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) { }
  private emailUsurio:string = "";
    

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.findAllUser();
      console.log(users,this.emailUsurio)
      if (users.length === 0) {
        return this.httpResponse.NotFound(res, "No existe el datos");
      }
      // this.httpResponse.Ok(res, users);
      res.render("users", { users });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getUserById(req: Request, res: Response) {
    let { id } = req.query;
    id = id?.toString() || "";
    let email = this.emailUsurio?.toString() || ""; 
    
    try {
      const datausuario = await this.userService.findUserByEmail(email);
      const data = await this.userService.findUserById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe datos");
      }
      if (datausuario?.role == ""){
        return res.render("editCliente",{user:datausuario})
      }else{
        return res.render("edit", {
        user: data,
      });
      }
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async getUserBygmail (req:Request,res:Response){
    const data  = req.body
    this.emailUsurio = data.email
    let {email } = data; 
    email = email?.toString() || ""; 
    const usuario = await this.userService.findUserByEmail(email);
    console.log(data,usuario)
    if (data.email == usuario?.email && data.password == usuario?.password && usuario?.role == "ADMIN" ){
      res.render("./index")
    }else if (data.email == usuario?.email && data.password == usuario?.password && usuario?.role == "" ){
      res.render("./indexCliente")
    } 
    else{
      res.render("./error");
    }
  }



  async createUser(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);
      console.log(data);
      //return this.httpResponse.Ok(res, data);
      res.render("index", { user: data });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }



  async register(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);
      console.log(data);
      //return this.httpResponse.Ok(res, data);
      res.render("login", { user: data });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }



  async search(req: Request, res: Response) {
    let { search } = req.query;
    search = search?.toString() || "";
    try {
      const users = await this.userService.search(search);
      res.render("search", {
        users: users,
        search: search
      });
    } catch (err) {
      res.render("message", {
        message: `Erro ao buscar usuário:`
      });
    }
  }



  async updateUser(req: Request, res: Response) {

    const { id } = req.body;
    console.log(id)
    let email = this.emailUsurio?.toString() || ""; 

    try {
      const datausuario = await this.userService.findUserByEmail(email);
      const data: UpdateResult = await this.userService.updateUser(
        id,
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al actualizar");
      }
      if (datausuario?.role == ""){
        res.render ("indexCliente")
      }else{
      res.render("./index")}
    }catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }



  async deleteUser(req: Request, res: Response) {
    // const { id } = req.params;
    const { id } = req.body;
    try {
      const data: DeleteResult = await this.userService.deleteUser(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al eliminar");
      }
      // return this.httpResponse.Ok(res, data);
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }


  
  async getCliente(req: Request, res: Response){
    let email = this.emailUsurio?.toString() || ""; 
    try {
      const data = await this.userService.findUserByEmail(email);
      console.log( data , this.emailUsurio)
      
      // this.httpResponse.Ok(res, users);
      res.render("perfilUsuario", { data   });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
}

