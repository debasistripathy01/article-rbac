import { error } from "console";
import express from "express";
import createHttpError from "http-errors";
const Router = express.Router();

Router.use((req, res, next) => {
  next(createHttpError.NotFound());
});

Router.use((error: { status: number }, req: any, res: any, next: any) => {
  error.status = error.status || 500;
  res.status(error.status);
  console.log(error);
  res.send(error);
});
export { Router };
