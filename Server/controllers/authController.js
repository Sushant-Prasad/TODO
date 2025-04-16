// Import necessary modules

import { createError } from "../utils/error.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Login Controller; Verifies user credentials and returns a token on success
 
export const postLoginUser = async (req, res, next) => {
  const data = req.body; // Get data from the request body
  console.log(data);

  // Check for required fields
  if (!data?.email || !data?.password) {
    return next(createError(400, "Missing fields"));
  }

  

  // Find user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(createError(400, "Invalid credentials"));
  }

  // Compare password with hashed password in DB
  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordCorrect) {
    return next(createError(400, "Invalid credentials"));
  }

  // Create JWT token with user ID
  const token = jwt.sign({ id: user._id }, process.env.JWT);
  console.log(token);

  // Set token in HTTP-only cookie
  res.cookie("access_token", token, {
    httpOnly: true, // prevents JS access on client-side
    secure: process.env.NODE_ENV === "production", 
  }).status(200).json("User Logged In Successfully!!");
};


 //Logout Controller;Clears the token cookie from the client

export const postLogoutUser = async (req, res, next) => {
  res.clearCookie("access_token", { 
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }).status(200).json("User Logged Out Successfully!!");
};


//Register Controller;Registers a new user after checking for duplicates and hashing the password

export const postRegisterUser = async (req, res, next) => {
  const data = req.body;
  console.log(data);

  // Validate required fields
  if (!data?.email || !data?.password) {
    return next(createError(400, "Missing fields"));
  }

 

  // Check if user is already registered
  const alreadyRegistered = await User.exists({ email: data.email });
  if (alreadyRegistered) {
    return next(createError(400, "User already exists"));
  }

  // Hash password before saving
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  // Create a new user object and save to DB
  const newUser = new User({ ...req.body, password: hash });
  await newUser.save();

  res.status(201).json("User Created Successfully");
};
