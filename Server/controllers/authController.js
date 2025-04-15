import { connectToDB } from "../utils/connect.js";
import { createError } from "../utils/error.js";
import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const postLoginUser = async (req, res, next) => {
  const data = req.body; // Get data from the request body
  console.log(data);
  // If email or password is missing from the request body, throw a 400 error
  if (!data?.email || !data?.password) {
    return next(createError(400, "missing fields"));
  }
  await connectToDB()
  const user = await User.findOne({email : req.body.email})
  if(!user){
    return next(createError(400,"Invalide Credentials"))
  }
  const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
  if(!isPasswordCorrect){
    return next(createError(400,"Invalide Credentials"))

  }
  const token = jwt.sign({id:user._id},process.env.JWT)
  console.log(token)
  res.cookie("access_token",token,{
    httpOnly : true,
    secure :process.env.NODE_ENV === "production"
  }).status(200).json("User Logged In Successfully!!")
 
};


export const postLogoutUser = async (req, res, next) => {
  res.clearCookie("acesss_token",{
    httpOnly : true,
    secure :process.env.NODE_ENV === "production"
  }).status(200).json("User Logged Out Successfully!!")
};
export const postRegisterUser = async (req, res, next) => {
  const data = req.body; // Get data from the request body
  console.log(data);
  // If email or password is missing from the request body, throw a 400 error
  if (!data?.email || !data?.password) {
    return next(createError(400, "missing fields"));
  }
  await connectToDB()
  const alreadyRegistered = await User.exists({email : data.email})
  if(alreadyRegistered){
    return next(createError(400,"User already excists"))
  }
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password,salt)
  const newUser = new User({...req.body,password:hash })
  await newUser.save()
  res.status(201).json("User Created Successfully");
};
