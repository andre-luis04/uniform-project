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
import { CartEntity } from "src/modules/cart/entities/cart.entity";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";

@Entity({ name: "cart_item" })
export class CartItemEntity extends TimestampedEntity implements ICartItem {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ name: "quantity", type: "integer" })
  quantity: number;

  @Column({ name: "id_cart", type: "uuid" })
  id_cart: string;

  @Column({ name: "id_product_variant" })
  id_variant: string;

  @OneToOne(
    () => ProductVariantEntity,
    (productVariant) => productVariant.cartItem
  )
  @JoinColumn({ name: "id_product_variant" })
  productVariant: ProductVariantEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.cartItem)
  @JoinColumn({ name: "id_cart" })
  cart: CartEntity;
}
