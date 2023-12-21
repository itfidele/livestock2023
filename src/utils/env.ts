export const nodeEnv = process.env.NODE_ENV || 'development'
export const isProduction = nodeEnv === 'production'
export const port = process.env.PORT || 3001
export const databaseUrl = process.env.DB_URL
export const dbUseSsl = process.env.DB_USE_SSL === 'true' || 'false'
export const synchronizeOrm = process.env.SYNCHRONIZE_ORM === 'true' || 'false'
export const jwtPrivateKey = (process.env.JWT_PRIVATE_KEY !== undefined) ? process.env.JWT_PRIVATE_KEY : 'kore-starter-templatekKaTT2dJRXSH3sMxkZ2aWY95jfTeXlocal'
export const apiBaseUrl = (process.env.API_BASE_URL !== undefined) ? process.env.API_BASE_URL : ''