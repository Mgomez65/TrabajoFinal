import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseEntity } from "../entities/purchase.entity";
import { purchaseDTO } from "../dto/purchase.dto";

export class purchaseService extends BaseService <PurchaseEntity>{
    constructor(){
        super(PurchaseEntity);
    }
    
    async findAllPurchase(): Promise<PurchaseEntity[]>{
        return (await this.execRepository).find();
    }
    async findPurchaseByid(id: string): Promise<PurchaseEntity | null> {
        return (await this.execRepository).findOneBy({ id });}

    async createPurchase(body: purchaseDTO): Promise<PurchaseEntity> {
        return (await this.execRepository).save(body);
    }
    async deletePurchase (id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });}

    async updatePurchase( id: string,infoUpdate: purchaseDTO ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);}
}
