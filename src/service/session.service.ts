import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { sessionDocument } from "../models/session.model";

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
export async function updateSession(query: FilterQuery<sessionDocument>, update : UpdateQuery<sessionDocument>){
  return SessionModel.updateOne(query,update)
}