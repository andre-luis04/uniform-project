import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClientEntity } from "../../Mclient/entities/clientEntity";
import { CartItemEntity } from "src/modules/cart_item/entities/CartitemEntity.ts";

@Entity({name : 'cart'})
export class CartEntity{

    @PrimaryGeneratedColumn('uuid', {name : 'cart_id'})
    id : string;

    @OneToOne(() => ClientEntity, (client) => client.cart)
    @JoinColumn()
    client : ClientEntity;

    @OneToOne(() => CartItemEntity, (cartItem) => cartItem.cart)
    @JoinColumn()
    cartItem : CartItemEntity;
}