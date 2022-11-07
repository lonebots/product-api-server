import { NextFunction, Request, Response } from "express";
import { get } from "lodash"; // make it easy for retriving properties which we doesn't know if it exist or not
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "")?.replace(
    /^Bearer\s/,
    ""
  ); // remove the word Bearer from the front of the accesstoken
  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  return next();
};

export default deserializeUser;
