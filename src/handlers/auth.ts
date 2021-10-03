import { RequestHandler } from "express";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { customError } from "../types/error";
export const signUp: RequestHandler = async function (req, res, next) {
  const { username, password, isAdmin }: IUser = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      isAdmin,
    });
    let token = jwt.sign({ username }, process.env.SECRET_KEY!);
    return res.status(200).send({ token });
  } catch (err: any) {
    if (err.code == 11000) {
      err.message = "Sorry username already taken";
    }
    next(err);
  }
};
export const signIn: RequestHandler = async function (req, res, next) {
  const { username, password }= req.body;

  try {
    let user = await User.findOne({ username });
    if(user){
        let isMatch=await user.comparePassword(password);
        if(isMatch){
            let token=jwt.sign({username},process.env.SECRET_KEY!);
            return res.status(200).send({username,token});
        }
    else throw Error("invalid email/password");

    }
    else throw Error("invalid email/password");

  } catch (err:any) {
      err.status=400
      console.log(err.message);
      next(err);
  }
};
