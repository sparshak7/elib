import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt'

const createUser = async(req: Request,res: Response,next: NextFunction) => {
  const {name, email, password} = req.body

  if(!name || !email || !password) {
    const error = createHttpError(400, 'All fields are required.')
    return next(error)
  }

  const user = await userModel.findOne({email})

  if(user) {
    const error = createHttpError(400, 'User already exists.')
    return next(error)
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await userModel.create({name, email, password: hashedPassword})

  res.json({_id: newUser._id, message: "User created."})

}

export {createUser}