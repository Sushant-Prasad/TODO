// Import custom error utility and JWT library
import { createError } from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to verify JWT token from cookies
export const verifyToken = (req, res, next) => {
  //Extract token from cookie (if it exists)
  const token = req.cookies?.access_token;

  // Debug log to see the extracted token in the console
  console.log(token);

  // If token doesn't exist, user is not authenticated
  if (!token) {
    return next(createError(401, "Not authenticated"));
  }

  // Verify the token using secret from environment variables
  jwt.verify(token, process.env.JWT, (err, user) => {
    // If verification fails (token is invalid or expired)
    if (err) {
      return next(createError(403, "Token is not valid"));
    }

    // If token is valid, attach the decoded user info to request object
    req.user = user;

    //Proceed to the next middleware or route handler
    next();
  });
};
