import { VariantsEntity } from "src/modules/variants/entities/variantsEntity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'size'})

export class SizeEntity {

    @PrimaryGeneratedColumn ('uuid')
    id! : string;
    @Column() 
    size : string;

    @OneToMany(() => VariantsEntity, (variants) => variants.size)
    variants : VariantsEntity[];

}