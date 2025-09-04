import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "../../order/entities/orderEntity";
import { CartEntity } from "src/modules/Mcart/entities/cartEntity";

@Entity({name : 'client'})

export class ClientEntity {
    @PrimaryGeneratedColumn('uuid')
    id!:string
    @Column()
    name : string
    @Column()
    phone : string
    @OneToMany(() => OrderEntity, (orders) => orders.client)
    orders : OrderEntity

    @OneToOne(() => CartEntity, (cart) => cart.client)
    cart : CartEntity;
}