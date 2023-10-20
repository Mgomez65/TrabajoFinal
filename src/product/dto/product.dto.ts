import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { ProductEntity } from "../entities/product.entity";

export class productDTO extends BaseDTO {

    @IsNotEmpty()
    name!: string; // name = nombre producto

    @IsNumber({}, { message: "Price should be a number" })
    price!: number; // price = precio del producto

    @IsOptional()
    product !: ProductEntity; // product = producto
}
