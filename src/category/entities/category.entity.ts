import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { ProductEntity } from "../product/entities/product.entity";




import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; // Importa los decoradores de TypeORM

@Entity()
export class CategoryDTO {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  categoryName: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];

  constructor(categoryName: string, description: string) {
    this.categoryName = categoryName;
    this.description = description;
  }
}
