import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "../../product/entities/productEntity";
import { SizeEntity } from "../../size/entities/sizeEntity";
import { CartItemEntity } from "src/modules/cart_item/entities/CartitemEntity.ts";
import { ColorEntity } from "src/modules/Mcolor/entities/colorEntity";

@Entity({name : 'product_variants'})
export class VariantsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'product_id' })
    productId: string;

    @Column({ name: 'size_id' })
    sizeId: string;

    @Column({name: 'color_id'})
    colorId: string;
 
    @ManyToOne(() => ProductEntity, (product) => product.variants)
    @JoinColumn({name : 'product_id'})
    product : ProductEntity;

    @ManyToOne(() => SizeEntity, (size) => size.variants)
    @JoinColumn({name : 'size_id'})
    size : SizeEntity;

    @ManyToOne(() => ColorEntity, (color) => color.variants)
    @JoinColumn({name: 'color_id'})
    color : ColorEntity;

    @OneToOne(() => CartItemEntity, (cartItem) => cartItem.variants)
    cartItem : CartItemEntity;


}