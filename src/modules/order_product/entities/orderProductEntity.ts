import { OrderEntity } from "src/modules/order/entities/orderEntity";
import { ProductEntity } from "src/modules/product/entities/productEntity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'order_product'})
export class OrderProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'product_id'})
    productId: string;

    @Column({name: 'order_id'})
    orderId: string;


    @ManyToOne(() => ProductEntity, (product) => product.orderProduct)
    @JoinColumn({name: 'product_id'})
    product : ProductEntity;

    @ManyToOne(() => OrderEntity, (order) => order.orderProduct)
    @JoinColumn({name: 'order_id'})
    order : OrderEntity;
}