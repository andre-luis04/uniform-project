import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { ProductEntity } from "../../product/entities/productEntity";
import { OrderProductEntity } from "../../order_product/entities/orderProductEntity";
import { ClientEntity } from "src/modules/Mclient/entities/clientEntity";


@Entity({name: 'order'})
export class OrderEntity {

    @PrimaryGeneratedColumn('uuid')
    id! : string
    @Column()
    total_price: number
    @Column()
    date_hour: Date
    @ManyToOne(() => ClientEntity, (client) => client.orders)
    client : ClientEntity

    @OneToMany (() => OrderProductEntity, (orderProduct) => orderProduct.order)
    orderProduct : OrderProductEntity;
    
}