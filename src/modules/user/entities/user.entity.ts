import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from "typeorm";
import { IUser } from "../interfaces/user.interface";
import { CartEntity } from "src/modules/cart/entities/cart.entity";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";

@Entity({ name: "user" })
export class UserEntity extends TimestampedEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @OneToMany(() => OrderEntity, (orders) => orders.user)
  orders: OrderEntity;

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity;
}
