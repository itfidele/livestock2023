import Router from "koa-router";
import { authRoutes } from "./auth";


const AppRouter = new Router();


AppRouter.get("/", async (ctx) => {
  ctx.body = {
    message: "👋 Welcome to koa-starter-template-api main page",
  };
});

AppRouter.use("/auth", authRoutes.routes());

export {AppRouter}