import crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { apiBaseUrl, jwtPrivateKey, nodeEnv } from "../../utils/env";
import logger from "../../utils/logger";

export async function getUserToken(
  email: string,
  userId: string,
  isAdmin: boolean
): Promise<string | undefined> {
  let payload = {};
  let options: jwt.SignOptions;
  const jwtid = crypto.randomBytes(16).toString("hex");
  payload = {
    email,
    userId,
    isAdmin,
  };
  options = {
    keyid: userId,
    jwtid,
    notBefore: "0",
    issuer: userId,
    subject: userId,
    audience: `${apiBaseUrl}/auth/login`,
    expiresIn: "7d",
    algorithm: "HS256",
  };
  logger.info(`[JWT-${nodeEnv}]: The options are ${JSON.stringify(options)}`);
  return jwt.sign(JSON.stringify(payload), jwtPrivateKey);
}

export async function decodeTokenizedRequest(token: string): Promise<any> {
  let actualToken = token;
  if (token.startsWith("Bearer")) {
    const splittedToken = token.split(" ");
    actualToken = splittedToken[1];
  }

  try {
    const decoded = jwt.decode(actualToken) as {
      userId: string;
      email: string;
      isAdmin: boolean;
    };
    return decoded;
  } catch (error) {
    throw new Error("Error processing the token");
  }
}
