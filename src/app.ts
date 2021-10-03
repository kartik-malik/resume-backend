import dotenv from "dotenv";
dotenv.config();

import express, { RequestHandler } from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import mailRouter from './routes/mail'
import errorHandler from "./handlers/error";
import { customError } from "./types/error";
const app = express();
mongoose.connect("mongodb://localhost:27017/resume");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mailRouter);
app.use(authRouter);
app.use(function (req, res, next) {
  let err: customError = new Error("Not found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);
app.listen(3000);
