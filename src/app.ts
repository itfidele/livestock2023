import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { AppRouter } from "./routes";
import json from "koa-json";
import logger from 'koa-logger'
import * as HttpStatus from 'http-status-codes'

const app = new Koa();

app.use(cors())
app.use(json())
app.use(logger())
app.use(bodyParser())


// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      await next()
    } catch (error) {
      ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR
      error.status = ctx.status
      ctx.body = { error }
    }
})

app.use(AppRouter.routes())
app.on("error", console.error)


export {app}