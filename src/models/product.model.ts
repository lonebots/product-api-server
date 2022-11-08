import mongoose from "mongoose";
import { UserDocument } from "../models/user.model";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10); // create a custom alphabet

// interface
export interface productDocument extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

// schema
const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

// model
const productModel = mongoose.model<productDocument>("Product", productSchema);

// export
export default productModel;
