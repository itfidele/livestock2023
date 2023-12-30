import { Context, Response } from "koa";
import { AnimalEntity } from "models/animal/animal.entity";
import { AnimalBreedEntity } from "models/animalbreed/animalbreed.entity";
import { AnimalTypeEntity } from "models/animaltype/animaltype.entity";
import { UsersEntity } from "models/user/user.entity";
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "utils/env";


cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});


class AnimalController{


    public async getAnimals(ctx:Context){
        if(ctx.state.isAdmin){
            let animals = await AnimalEntity.find();
            
            const final_animals = function(animals){
                return animals.map(async (element) => {
                    element['key'] = element.id;
                    element.breed = (await AnimalBreedEntity.findOne(element.breed)).name;
                    element.type = (await AnimalTypeEntity.findOne(element.type)).name;
                    element.user = await UsersEntity.findOne(element.user);
                    return element;
                })
            };
            
            animals = await Promise.all(final_animals(animals));

            ctx.body = animals;
        }
        else{
            let animals = await AnimalEntity.find({
                where:{
                    user: ctx.state.userId
                }
            });
            
        
            const final_animals = function(animals){
                return animals.map(async (element) => {
                    element.breed = (await AnimalBreedEntity.findOne(element.breed)).name;
                    element.type = (await AnimalTypeEntity.findOne(element.type)).name;
                    element.user = await UsersEntity.findOne(element.user);
                    return element;
                })
            };
            
            animals = await Promise.all(final_animals(animals));
            
            ctx.status = 200;

            ctx.body = animals;
        }
        
    }


    public async getAnimal(ctx:Context){
        const { id } = ctx.params;
        const animal = await AnimalEntity.findOne(id,{
            relations:['breed','type','user']
        });
        ctx.body = animal;
    }
    
    
    public async createAnimal(ctx: Context){
        const form = ctx.request['body'];
        const image = ctx.request['files']['image'];
        console.log(form)
        const result = await cloudinary.uploader.upload(image.filepath,{
            resource_type: "image",
        });
        console.log(result)
        const { name, age, breed, type,track_code } = ctx.request['body'] as any;
    
        try {
            const newAnimal = await AnimalEntity.create({ name, age, breed, type, user: ctx.state.userId,imageURL:result.url,track_code });
            await newAnimal.save();
            ctx.status = 201;
            ctx.body = newAnimal;
        } catch (error) {
            console.log(error);
            ctx.status = 400;
            ctx.body = {
                error: "Error creating animal",
                status:400
            };
        }
    }


    public async deleteAnimal(ctx:Context){
        const { id } = ctx.params;
        const animal = await AnimalEntity.findOne(id);
        await animal.remove();
        ctx.status = 200;
        ctx.body = {
            message: "Animal Deleted",
            status:200
        };
    }


    public async createAnimalBreed(ctx: Context){
        const { name } = ctx.request['body'] as any;
        const newAnimalBreed = await AnimalBreedEntity.create({ name, user: ctx.state.userId });
        await newAnimalBreed.save();
        ctx.status = 201;
        ctx.body = newAnimalBreed;
    }

    public async getAnimalBreed(ctx: Context){
        const animalBreed = await AnimalBreedEntity.find({
            where:{
                user: ctx.state.userId
            }
        });
        ctx.body = animalBreed;
    }


    public async createAnimalType(ctx: Context){
        const { name } = ctx.request['body'] as any;
        const newAnimalType = await AnimalTypeEntity.create({ name, user: ctx.state.userId });
        await newAnimalType.save();
        ctx.status = 201;
        ctx.body = newAnimalType;
    }

    public async getAnimalType(ctx: Context){
        const animalType = await AnimalTypeEntity.find({
            where:{
                user: ctx.state.userId
            }
        });
        ctx.body = animalType;
    }

    // public async getAnimal(req: Request, res: Response) {
    //     const animal = await AnimalEntity.findById(req.params.id);
    //     return res.json(animal);
    // }

    // public async deleteAnimal(req: Request, res: Response): Promise<Response> {
    //     const animal = await Animal.findByIdAndDelete(req.params.id);
    //     return res.json({ message: 'Animal Deleted' });
    // }

    // public async updateAnimal(req: Request, res: Response): Promise<Response> {
    //     const { name, age, breed, type } = req.body;
    //     const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, { name, age, breed, type });
    //     return res.json({ message: 'Successfully updated' });
    // }
}


export default AnimalController;