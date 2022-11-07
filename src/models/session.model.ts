import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { UserDocument } from "./user.model";
import { string } from "zod";

// session document type
export interface sessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: Boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

// schema for session
const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: string },
  },
  {
    timestamps: true,
  }
);

// model
const SessionModel = mongoose.model<sessionDocument>("Session", sessionSchema);

// export
export default SessionModel;
