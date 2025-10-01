import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsizeEntity } from "../interfaces/size.interface";
import { ProductVariantEntity } from "src/modules/product_variant/entities/product.variant.entity";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";

@Entity({ name: "size" })
export class SizeEntity extends TimestampedEntity implements IsizeEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({ name: "size" })
  size!: string;

  @OneToMany(
    () => ProductVariantEntity,
    (productVariant) => productVariant.size
  )
  productVariant!: ProductVariantEntity[];
}
