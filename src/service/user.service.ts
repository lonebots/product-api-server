import { DocumentDefinition } from "mongoose";
import userModel, { UserDocument } from "../models/user.model";

// create user service
export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    return await userModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
