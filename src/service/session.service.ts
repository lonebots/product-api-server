import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { sessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";
import logger from "../utils/logger";

// create a session
export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<sessionDocument>) {
  return SessionModel.find(query).lean();
  // lean ensures that it won't return all the object of mongoose and similar to the json
}

// updating session
export async function updateSession(
  query: FilterQuery<sessionDocument>,
  update: UpdateQuery<sessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

// reissue the access token
export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}
