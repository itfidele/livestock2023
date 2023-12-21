import { Connection, createConnection } from 'typeorm'
import * as config from "./ormconfig"


let connection: Connection


export async function closeDbConnection (): Promise<void> {
    if (connection && connection.isConnected) {
      return connection.close()
    }
  }
  
export async function createMysqlConnection (): Promise<Connection> {
    await closeDbConnection()
    connection = await createConnection(config)
    return connection
}
  
export async function getConnection (): Promise<Connection> {
    if (connection && connection.isConnected) {
      return connection
    }
    return createMysqlConnection()
}
