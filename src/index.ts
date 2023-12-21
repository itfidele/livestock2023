import logger from "utils/logger";
import { app } from "./app";
import { nodeEnv, port } from "./utils/env";
import { createMysqlConnection } from "./models/typeorm";
require("dotenv").config();


async function launchApp(){

    if (!nodeEnv) {
        logger.error('Node Env was not specified')
        process.exit(1)
      }
      logger.info(`[SERVER-${nodeEnv}]: Launching the App ... `)
      try {
        await createMysqlConnection()
        logger.info('[TYPEORM]: Connected to the database')
      } catch (error) {
        logger.error(`[TYPEORM]: Could not connect to database due to ${error.message}`)
        throw error
      }
      
    const server = app.listen(port, (): void => {
        logger.info(`Listening on port ${process.env.PORT || 3000}`);
    })

    server.setTimeout(30*1000)
    return "Server is running"
}


launchApp().then(logger.info).catch(error =>{
    logger.error(error.message)
    process.exit(1)
})