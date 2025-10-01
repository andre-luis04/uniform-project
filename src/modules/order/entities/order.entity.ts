import { UserEntity } from "src/modules/user/entities/user.entity";
import { TimestampedEntity } from "src/shared/entities/timestamp.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { IOrder } from "../interfaces/order.interface";
import { OrderVariantEntity } from "src/modules/order_variant/entities/order_variant.entity";
import { OrderStatus } from "src/enums/status.enum";

@Entity({ name: "order" })
export class OrderEntity extends TimestampedEntity implements IOrder {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "id_user" })
  id_user!: string;

  @Column({
    name: "status",
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDENTE,
  })
  status!: OrderStatus;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: "id_user" })
  user!: UserEntity;

  @OneToMany(() => OrderVariantEntity, (orderVariant) => orderVariant.order, {
    cascade: true,
  })
  orderVariant!: OrderVariantEntity[];
}
