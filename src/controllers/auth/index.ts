import { getUserToken } from "../../controllers/jwt";
import { UsersEntity } from "../../models/user/user.entity";
import logger from "../../utils/logger";
import bcrypt from "bcrypt";


export async function handleLogin(
    email: string,
    password: string
  ): Promise<{ isAdmin: boolean; token: string | undefined }> {
    const thisUser = await UsersEntity.getUserByEmail(email.toLowerCase());
    logger.info("this user =====>", { thisUser });
    if (!thisUser) {
      throw new Error("User with this email is not found");
    }
    const validPassword = await bcrypt.compare(password, thisUser.password);
    if (!validPassword) {
      throw new Error("Wrong Password");
    }
    const token = await getUserToken(email, thisUser.id, thisUser.isAdmin);
    await UsersEntity.updateLastLogin(thisUser.id);
    return { isAdmin: thisUser.isAdmin, token };
}


export async function handleRegistration(
    email: string,
    plainPassword: string,
    firstName: string,
    lastName: string
  ): Promise<string> {
    //TODO: Add email verification
    //await verifyEmailAuthenticity(email);
    const thisUser = await UsersEntity.getUserByEmail(email.toLowerCase());
    if (thisUser !== undefined) {
      throw new Error("User with this email Already exists");
    }
    const password = bcrypt.hashSync(plainPassword, 10);
    logger.info(`we have successfully hashed the password`, { password });
    const newUser = await UsersEntity.createUser(
      email.toLowerCase(),
      password,
      firstName,
      lastName
    );
    return await getUserToken(email, newUser, false);
  }
