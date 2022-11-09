import { Express, Request, Response } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  // health check route
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // create user
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  // create user session
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  // get all sessions
  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  // delete user session
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // product
  // // create product
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  // update
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  // get
  app.get("/api/products/:productId", [requireUser], getProductHandler);

  // delete
  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}
export default routes;
