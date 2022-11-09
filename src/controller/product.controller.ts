import { Request, Response } from "express";
import { rest } from "lodash";
import {
  createProductInput,
  deletProductInput,
  getProductInput,
  updateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";

// create
export async function createProductHandler(
  req: Request<{}, {}, createProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;
  const product = await createProduct({
    ...body,
    user: userId,
  });
  return res.send(product);
}

// update
export async function updateProductHandler(
  req: Request<updateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const update = req.body;
  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }
  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });

  return res.send(updatedProduct);
}

// get
export async function getProductHandler(
  req: Request<getProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  return res.send(product);
}

// delete
export async function deleteProductHandler(
  req: Request<deletProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  console.log(product);
  console.log(`product.user : ${String(product.user)} || user : ${userId}`);
  if (String(product.user) !== userId) {
    console.log("product user missmatch");
    return res.sendStatus(403);
  }
  await deleteProduct({ productId });
  res.sendStatus(200);
}
