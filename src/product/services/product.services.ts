import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductEntity } from "../entities/product.entity";
import { productDTO } from "../dto/product.dto";

export class productService extends BaseService <ProductEntity>{
    constructor(){
        super(ProductEntity);
    }
    
    async findAllProduct(): Promise<ProductEntity[]>{
        return (await this.execRepository).find();
    }
    async findProductByid(id: string): Promise<ProductEntity | null> {
        return (await this.execRepository).findOneBy({ id });}

    async createProduct(body: productDTO): Promise<ProductEntity> {
        return (await this.execRepository).save(body);
    }
    async deleteProduct (id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });}

    async updateProduct( id: string,infoUpdate: productDTO ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);}
}
