import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { UserEntity } from "../../user/entities/user.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";


export class CustomerDTO extends BaseDTO {

    @IsNotEmpty()
    address!: string;
  
    @IsNotEmpty()
    dni!: number;
  
    @IsNotEmpty()
    user!: UserEntity;

    @IsNotEmpty()
    purchases!: PurchaseEntity[];



}