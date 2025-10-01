import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IcolorEntity } from "../interfaces/color.interface";
import { ProductVariantEntity } from "src/modules/product_variant/entities/product.variant.entity";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";

@Entity({ name: "color" })
export class ColorEntity extends TimestampedEntity implements IcolorEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id!: string;
  @Column({ name: "color" })
  color!: string;

  @OneToMany(
    () => ProductVariantEntity,
    (productVariant) => productVariant.color
  )
  productVariant!: ProductVariantEntity[];
}
