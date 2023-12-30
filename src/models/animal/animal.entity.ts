import {BaseEntity, Entity, ManyToOne,Column,PrimaryGeneratedColumn,Index} from "typeorm";
import { UsersEntity } from "../user/user.entity"
import { AnimalBreedEntity } from "models/animalbreed/animalbreed.entity";
import { AnimalTypeEntity } from "models/animaltype/animaltype.entity";

@Entity({name: 'animals'})
export class AnimalEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    @Index()
    public id: string

    @Column({ name: 'name', type: 'varchar' })
    public name: string

    @ManyToOne(() => AnimalTypeEntity, animal_type => animal_type.name)
    public type: AnimalTypeEntity

    @Column({ name: 'track_code', type: 'varchar' })
    public track_code: string

    @Column({ name: 'image', type: 'text',nullable:true })
    public imageURL: string

    @ManyToOne(() => AnimalBreedEntity, breed => breed)
    public breed: AnimalBreedEntity

    @Column({ name: 'age', type: "integer", })
    public age: string

    @ManyToOne(() => UsersEntity, user => user)
    public user: UsersEntity
}