import { decodeTokenizedRequest } from '../controllers/jwt'
import { Context, Next } from 'koa'
import { UsersEntity } from '../models/user/user.entity'
import { nodeEnv } from '../utils/env'
import logger from '../utils/logger'

export async function restrictToAdmins (ctx: Context, next: Next): Promise<Next> {
  const token = ctx.request.headers.authorization
  const {userId} = await decodeTokenizedRequest(token)
  if ((await UsersEntity.getUserById(userId)).isAdmin) {
    ctx.state.adminId = userId
    return await next()
  }
  logger.error(`[MW~${nodeEnv}]: Could not figure account Type`)
  ctx.throw(401, 'You don\'t have access for this action')
}

export async function mustBeAuthenticated (ctx: Context, next: Next): Promise<Next> {
  const AuthorizationToken = ctx.request.headers.authorization
  
  try{
    const {
      userId,
      isAdmin
    } = await decodeTokenizedRequest(AuthorizationToken);
    ctx.state.userId = userId;
    ctx.state.isAdmin = isAdmin;
    const thisUserAccount = await UsersEntity.getUserById(userId);
    if (thisUserAccount !== undefined) {
      return await next();
    }
  }
  catch(error){
    console.log(error);
    ctx.throw("User does not exist", 400);
  }

}