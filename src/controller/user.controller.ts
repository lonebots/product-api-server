import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { CreateUserInput } from "../schema/user.schema";

// for creating user
// we can specify what a request body should expect
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body); // call create user service
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message); // 409 conflict
  }
}
