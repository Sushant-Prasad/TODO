import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import todoRouter from "./routes/todoRouter.js";
import bodyParser from "body-parser";
import { connectToDB } from "./utils/connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file

const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from frontend
  credentials: true // Allow cookies to be sent from frontend
};

const app = express();
const PORT = 3000; // Server will listen on this port

app.use(cors(corsOptions)); // Enable CORS with defined options
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from incoming requests

// Route handler for user authentication
app.use("/api/user", authRouter);

// Route handler for todo operations
app.use("/api/todos", todoRouter);


// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status
  const message = err.message || "internal server error"; // Default message
  res.status(statusCode).json({ error: message }); // Send error response
});

// Function to start the server after connecting to DB
const startServer = async () => {
  try {
    await connectToDB(); // Connect to MongoDB
    console.log("DB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer(); // Start the server
