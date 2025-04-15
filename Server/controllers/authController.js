import { connectToDB } from "../utils/connect.js";
import { createError } from "../utils/error.js";
import User from "../model/userModel.js"

export const postLoginUser = async (req, res, next) => {
  res.send("Login user");
};
export const postLogoutUser = async (req, res, next) => {
  res.send("Logout user");
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
    return next(createError(400,"User already"))
  }
  res.send("Register user");
};
