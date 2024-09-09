import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async(req: Request,res: Response,next: NextFunction) => {
  const {name, email, password} = req.body

  if(!name || !email || !password) {
    const error = createHttpError(400, 'All fields are required.')
    return next(error)
  }

  let newUser: User

  try {
    const user = await userModel.findOne({email})

    if(user) {
      const error = createHttpError(400, 'User already exists.')
      return next(error)
    }
    
  } catch (error) {
    return next(createHttpError(500, 'Error while getting user.'))
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    newUser = await userModel.create({name, email, password: hashedPassword})
    
  } catch (error) {
    return next(createHttpError(500, 'Error while creating user.'))
  }

  try {
    
    const token = sign({sub: newUser._id}, config.jwt_secret as string, {expiresIn: "7d"})
  
    res.json({access_token: token, message: "User created."})
    
  } catch (error) {
    return next(createHttpError(500, 'Error while signing token.'))
  }
  
}

export {createUser}