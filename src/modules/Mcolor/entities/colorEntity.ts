import { VariantsEntity } from "src/modules/variants/entities/variantsEntity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ColorEntity {

    @PrimaryGeneratedColumn('uuid', {name: 'color_id'})
    id : string
    @Column({name : 'color_name'})
    name : string

    @OneToMany(() => VariantsEntity, (variants) => variants.color)
    variants : VariantsEntity;
}