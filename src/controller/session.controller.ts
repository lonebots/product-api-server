import { Request, Response } from "express";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { createSessionInput } from "../schema/session.schema";
import { TransformStreamDefaultController } from "stream/web";

export async function createUserSessionHandler(
  req: Request<{}, {}, createSessionInput["body"]>,
  res: Response
) {
  // validate user password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.sendStatus(401).send("Ivalid email or password");
  }

  // create session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  ); // 15 min

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") }
  );

  // return the tokens
  return res.send({ accessToken, refreshToken });
}

// get user sessions
export async function getUserSessionsHandler(req: Request, res: Response) {
  // we nee a middleware to add the user to the request object everytime
  const userId = res.locals.user._id;
  const sessions = await findSessions({
    user: userId,
    valid: true,
  });
  return res.send(sessions);
}

// delete user session
export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  await updateSession({_id : sessionId},{valid : false}) // session not deleted, its made invalid.
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
