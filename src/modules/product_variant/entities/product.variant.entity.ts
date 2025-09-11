import { ColorEntity } from "src/modules/color/entities/color.entity";
import { ProductEntity } from "src/modules/product/entities/productEntity";
import { SizeEntity } from "src/modules/size/entities/size.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { IProductVariants } from "../interfaces/product.variant.interface";
import { CartItemEntity } from "src/modules/cart_item/entities/cart_item.entity";
import { OrderVariantEntity } from "src/modules/order_variant/entities/order_variant.entity";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";

@Entity({ name: "product_variants" })
export class ProductVariantEntity
  extends TimestampedEntity
  implements IProductVariants
{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "id_product" })
  id_product: string;

  @Column({ name: "id_color" })
  id_color: string;

  @Column({ name: "price", type: "decimal" })
  price: number;

  @Column({ name: "id_size", nullable: true })
  id_size?: string;

  @Column({ name: "stock", nullable: true })
  stock?: number;

  @ManyToOne(() => ProductEntity, (product) => product.productVariant)
  @JoinColumn({ name: "id_product" })
  product: ProductEntity;

  @ManyToOne(() => SizeEntity, (size) => size.productVariant)
  @JoinColumn({ name: "id_size" })
  size: SizeEntity;

  @ManyToOne(() => ColorEntity, (color) => color.productVariant)
  @JoinColumn({ name: "id_color" })
  color: ColorEntity;

  @OneToMany(
    () => OrderVariantEntity,
    (orderVariant) => orderVariant.productVariant
  )
  orderVariant: OrderVariantEntity;

  @OneToOne(() => CartItemEntity, (cartItem) => cartItem.productVariant)
  cartItem: CartItemEntity;
}
