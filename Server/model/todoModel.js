import mongoose from "mongoose";

// Define the schema for the Todo model
const todoSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required: [true, "Id is required"],
  },
  name: {
    type: String,
    required: [true, "Email is required"],
    trim: true, // removes leading/trailing spaces
  },
  isCompleted: {
    type: Boolean,
    default:false
  }
});

// Export the Todo model
export default mongoose.model("Todo", todoSchema);
