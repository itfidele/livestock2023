import { AnimalEntity } from "models/animal/animal.entity";
import { UsersEntity } from "models/user/user.entity";
import { BaseEntity, Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity({name: 'animal_types'})
export class AnimalTypeEntity extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    @Index()
    id: number;

    @Column({ type: "varchar", length: 255, name:"name"})
    name: string;

    @ManyToOne(()=>UsersEntity, user => user)
    user: UsersEntity;

    @OneToMany(() => AnimalEntity, animal => animal.type)
    animals: AnimalEntity[];
    
}