import { CartItemEntity } from "src/modules/cart_item/entities/cart_item.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Icart } from "../interfaces/cart.interface";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";

@Entity({ name: "cart" })
export class CartEntity extends TimestampedEntity implements Icart {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ name: "id_user" })
  id_user: string;

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: "id_user" })
  user: UserEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  cartItem: CartItemEntity[];
}
