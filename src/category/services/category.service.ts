import { BaseService } from "../../config/base.service";
import { CategoryEntity } from "../../../../crud-typescript/src/category/category.entity";
import { UserDTO } from "../../../../crud-typescript/TrabajoFinal/src/user/dto/user.dto";

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async findAllcategory(): Promise<CategoryEntity[]> {
    return (await this.execRepository).find();
  }

  async findAllcategoryById(id: string): Promise<CategoryEntity | undefined> {
    return (await this.execRepository).findOne(id);
  }

  async Createcategory(body: UserDTO): Promise<CategoryEntity | void> {
    return (await this.execRepository).save(body);
  }

  async deleteAllcategory(id: string): Promise<any> {
   
    return (await this.execRepository).delete(id);
  }

  async updatecategory(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}