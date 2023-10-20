import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class CategoryDTO {
    @IsNotEmpty()
    id: number;

  
    @IsNotEmpty()
    categoryName: string;
  
    @IsNotEmpty()
    description: string;
  
    @IsNotEmpty()
    products: ProductEntity[];
  
    
  }
  