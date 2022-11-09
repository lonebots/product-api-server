import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import productModel, { ProductDocument } from "../models/product.model";

// create
export async function createProduct(
  input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>
) {
  return productModel.create(input);
}

// find
export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options?: QueryOptions | undefined
) {
  return productModel.findOne(query, options);
}

// update
export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return productModel.findOneAndUpdate(query, update, options);
}

// delete
export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return productModel.deleteOne(query);
}
