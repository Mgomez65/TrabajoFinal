import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CategoryEntity } from "../../../../crud-typescript/src/category/category.entity";
import { CategoryDTO } from "../dto/category.dto";


export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async findAllCategory(): Promise<CategoryEntity[]> {
    return (await this.execRepository).find();
  }

  async findAllCategoryById(id: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).findOne({});
  }

  async CreateCategory(body: CategoryDTO): Promise<CategoryEntity | void> {
    return (await this.execRepository).save(body);
  }

  async deleteAllCategory(id: string): Promise<any> {
   
    return (await this.execRepository).delete(id);
  }

  async updateCategory(id: string, infoUpdate: CategoryDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}