import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IProductEntity } from "../interfaces/product.interface";
import { ProductVariantEntity } from "src/modules/product_variant/entities/product.variant.entity";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";

@Entity({ name: "product" })
export class ProductEntity extends TimestampedEntity implements IProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => ProductVariantEntity,
    (productVariant) => productVariant.product
  )
  productVariant: ProductVariantEntity;
}
