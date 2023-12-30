import AnimalController from "controllers/animal";
import Router from "koa-router";
import { mustBeAuthenticated } from "middleware";


const animalRouter = new Router();

const animalController = new AnimalController()

animalRouter.use(mustBeAuthenticated);

animalRouter.get("/",animalController.getAnimals);
animalRouter.get("/view/:id",animalController.getAnimal);
animalRouter.post("/add",animalController.createAnimal);
animalRouter.delete("/delete/:id",animalController.deleteAnimal);
animalRouter.get('/breed/',animalController.getAnimalBreed);
animalRouter.post("/breed/add",animalController.createAnimalBreed);
animalRouter.get("/type/",animalController.getAnimalType);
animalRouter.post("/type/add",animalController.createAnimalType);


export default animalRouter;