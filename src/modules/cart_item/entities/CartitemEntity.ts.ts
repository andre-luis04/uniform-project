import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "../../Mcart/entities/cartEntity";
import { VariantsEntity } from "src/modules/variants/entities/variantsEntity";

@Entity({name : 'cart_item'})
export class CartItemEntity {

    @PrimaryGeneratedColumn('uuid', {name : 'cart_item_id'})
    id : string;

    @Column({name : 'quantity', type : "integer"})
    quantity : number;

    @OneToOne(() => VariantsEntity, (variants) => variants.cartItem)
    @JoinColumn()
    variants : VariantsEntity;

    @OneToOne(() => CartEntity, (cart) => cart.cartItem)
    cart : CartEntity;
}