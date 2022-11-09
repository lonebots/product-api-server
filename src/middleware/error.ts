import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  err.message = error.message;

  // log the error
  console.log(err.errors);

  // Mongoose wrong objectId
  if (err.name == "CasteError") {
    const message = `Resource not found with Id : ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  // Mongoose Error Duplicate Key
  if (err.code === 11000) {
    const message = `Duplicate Fields are found`;
    error = new ErrorResponse(message, 400);
  }
  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = "Object.values(err.errors).map((val:errors)=>val.message)";
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500);
};
