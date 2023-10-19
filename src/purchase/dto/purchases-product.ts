import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "../entities/purchase.entity";

export class purchaseProductDTO extends BaseDTO{
    @IsNotEmpty()
    quantityProduct!: number; // quantityPRoduct = cantidad Producto 

    @IsNotEmpty()
    totalPrice!: number; // totalPrice = total precio 
    
    @IsOptional()
    purchase!: PurchaseEntity; // purchase = compra
    
    @IsOptional()
    product!: ProductEntity // product = producto

}