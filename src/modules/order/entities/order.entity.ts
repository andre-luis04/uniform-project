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

@Entity({ name: "order" })
export class OrderEntity extends TimestampedEntity implements IOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal" })
  total_price: number;

  @Column({ name: "id_client" })
  id_client: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: "id_client" })
  user: UserEntity;

  @OneToMany(() => OrderVariantEntity, (orderVariant) => orderVariant.order)
  orderVariant: OrderVariantEntity;
}
