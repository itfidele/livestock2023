import { join } from 'path'
import { databaseUrl, dbUseSsl, isProduction, synchronizeOrm } from "../utils/env"
import CustomNamingStrategy from './namingStrategy'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

const config = {
  type: 'mysql',
  url: databaseUrl,
  ssl: dbUseSsl ? { rejectUnauthorized: false } : false,
  synchronize: !isProduction && synchronizeOrm,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migration', '*.{ts,js}')],
  cli: {
    migrationsDir: './src/models/migration'
  },
  namingStrategy: new CustomNamingStrategy()
} as MysqlConnectionOptions

export = config