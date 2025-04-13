import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    trim: true, // removes leading/trailing spaces
    lowercase: true, // converts email to lowercase
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"], 
  }
});

// Export the User model
export default mongoose.model("User", userSchema);
