import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import productModel, { productDocument } from "../models/product.model";

// create
export async function createProduct(
  input: DocumentDefinition<Omit<productDocument, "createAt" | "updatedAt">>
) {
  return productModel.create(input);
}

// find
export async function findProduct(
  query: FilterQuery<productDocument>,
  options: QueryOptions = { lean: true }
) {
  return productModel.findOne(query, options);
}

// update
export async function findAndUpdateProduct(
  query: FilterQuery<productDocument>,
  update: UpdateQuery<productDocument>,
  options: QueryOptions
) {
  return productModel.findOneAndUpdate(query, update, options);
}

// delete
export async function deleteProduct(query: FilterQuery<productDocument>) {
  return productModel.deleteOne(query);
}
