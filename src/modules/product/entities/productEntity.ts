import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProductEntity } from "src/modules/order_product/entities/orderProductEntity";
import { VariantsEntity } from "src/modules/variants/entities/variantsEntity";


@Entity({name : 'product'})

export class ProductEntity {

    @PrimaryGeneratedColumn('uuid')
    id! : string;
    @Column()
    name : string;
    @Column()
    description : string;
    @Column()
    price : number;

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
    orderProduct : OrderProductEntity;

    @OneToMany(() => VariantsEntity, (variants) => variants.product)
    variants : VariantsEntity;


}