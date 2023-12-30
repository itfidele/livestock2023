import Router from "koa-router";
import { authRoutes } from "./auth";
import animalRouter from "./animal";


const AppRouter = new Router();


AppRouter.get("/", async (ctx) => {
  ctx.body = {
    message: "👋 Welcome to livestock-rest-api main page",
  };
});

AppRouter.use("/auth", authRoutes.routes());
AppRouter.use("/animal", animalRouter.routes());

export {AppRouter}