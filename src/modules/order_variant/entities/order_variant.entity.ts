import { OrderEntity } from "src/modules/order/entities/order.entity";
import { ProductVariantEntity } from "src/modules/product_variant/entities/product.variant.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IOrderVariant } from "../interfaces/order_variant.interface";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";

@Entity({ name: "order_product" })
export class OrderVariantEntity
  extends TimestampedEntity
  implements IOrderVariant
{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "id_variant" })
  id_variant: string;

  @Column({ name: "id_order" })
  id_order: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderVariant)
  @JoinColumn({ name: "id_order" })
  order: OrderEntity;

  @ManyToOne(
    () => ProductVariantEntity,
    (productVariant) => productVariant.orderVariant
  )
  @JoinColumn({ name: "id_variant" })
  productVariant: ProductVariantEntity;
}
