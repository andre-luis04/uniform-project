import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  DeleteDateColumn,
  BeforeInsert,
} from "typeorm";
import { IUser } from "../interfaces/user.interface";
import { CartEntity } from "src/modules/cart/entities/cart.entity";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";
import * as bcrypt from "bcrypt";

@Entity({ name: "user" })
export class UserEntity extends TimestampedEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user-name" })
  name: string;

  @Column({ name: "phone" })
  phone: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "password", nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => OrderEntity, (orders) => orders.user)
  orders: OrderEntity[];

  @OneToOne(() => CartEntity, (cart) => cart.user, { cascade: true })
  cart: CartEntity;
}
