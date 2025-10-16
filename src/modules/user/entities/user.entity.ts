import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
  BeforeInsert,
} from "typeorm";
import { IUser } from "../interfaces/user.interface";

import { OrderEntity } from "src/modules/order/entities/order.entity";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";
import * as bcrypt from "bcrypt";
import { CartItemEntity } from "src/modules/cart_item/entities/cart_item.entity";
import { UserRoles } from "src/enums/roles.enum";

@Entity({ name: "user" })
export class UserEntity extends TimestampedEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user-name" })
  name!: string;

  @Column({ name: "phone" })
  phone!: string;

  @Column({ name: "email" })
  email!: string;

  @Column({
    name: "role",
    type: "enum",
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role!: UserRoles;

  @Column({ name: "password", nullable: false })
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => OrderEntity, (orders) => orders.user)
  orders!: OrderEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.user)
  cartItem!: CartItemEntity[];
}
