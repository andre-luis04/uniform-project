import { ProductVariantEntity } from "src/modules/product_variant/entities/product.variant.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ICartItem } from "../interfaces/cartItem.interface";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Entity({ name: "cart_item" })
export class CartItemEntity extends TimestampedEntity implements ICartItem {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id!: string;

  @Column({ name: "quantity", type: "integer" })
  quantity!: number;

  @Column({ name: "id_user", type: "uuid" })
  id_user!: string;

  @Column({ name: "id_product_variant", type: "uuid" })
  id_variant!: string;

  @OneToOne(
    () => ProductVariantEntity,
    (productVariant) => productVariant.cartItem
  )
  @JoinColumn({ name: "id_product_variant" })
  productVariant!: ProductVariantEntity;

  @ManyToOne(() => UserEntity, (user) => user.cartItem)
  @JoinColumn({ name: "id_user" })
  user!: UserEntity;
}
