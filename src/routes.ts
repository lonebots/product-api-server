import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  // health check route
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // create user
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  // create session
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  // get all routes
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
}
export default routes;
