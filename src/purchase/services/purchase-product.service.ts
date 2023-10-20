import { DeleteResult,UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseEntity } from "../entities/purchase.entity";
import { PurchaseProductEntity } from "../entities/purchases-products.entity";
import { purchaseProductDTO } from "../dto/purchases-product";

export class purchaseProductService extends BaseService<PurchaseProductEntity>{
    constructor(){
        super(PurchaseProductEntity)
    }

    async findAllPurchaseProduct(): Promise<PurchaseProductEntity[]>{
    return (await this.execRepository).find();}
    
    async findPurchaseProductByid(id: string): Promise<PurchaseProductEntity | null> {
        return (await this.execRepository).findOneBy({ id });}

    async createPurchaseProduct (body: purchaseProductDTO): Promise<PurchaseProductEntity> {
        return (await this.execRepository).save(body);
        }
    async deletePurchaseProdcut (id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });}
    
    async updatePurchaseProdcut( id: string,infoUpdate: purchaseProductDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);}

}