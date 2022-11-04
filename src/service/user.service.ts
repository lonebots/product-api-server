import { DocumentDefinition } from "mongoose";
import userModel, { UserDocument } from "../models/user.model";

// create user service
export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await userModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
