import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load .env values

// Create a connection tracker object
const connection = {
  isConnected: null // Will track if DB is connected to avoid reconnecting
};

// Function to connect to MongoDB
export const connectToDB = async () => {
  try {
    // If already connected, skip reconnection
    if (connection.isConnected) {
      return;
    }

    // Connect to MongoDB using URI from environment variable
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use new URL parser to handle special characters
      useUnifiedTopology: true // Use new server discovery and monitoring engine
    });

    // Set connection status
    connection.isConnected = db.connections[0].readyState; // readyState values: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    console.log("MongoDB connected:", connection.isConnected);

  } catch (error) {
    // Log connection errors
    console.log("Database connection failed:", error);
  }
};
