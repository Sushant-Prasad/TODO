import express from "express";
import {
  postLoginUser,
  postLogoutUser,
  postRegisterUser
} from "../controllers/authController.js"; 

const authRouter = express.Router();
authRouter.post("/login", postLoginUser);
authRouter.post("/logout", postLogoutUser);
authRouter.post("/register",postRegisterUser);


export default authRouter;