import mongoose from "mongoose";

let isConnected = false; // Global variable to track if the connection has been established

const connectMongoDB = async () => {
  if (isConnected) {
    // No need to reconnect or log if it's already connected
    return;
  }

  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Database already connected.");
    isConnected = true; // Set the flag after the first connection
    return;
  }

  if (connectionState === 2) {
    console.log("Database connecting...");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
    isConnected = true; // Set the flag after successful connection
  } catch (error) {
    console.log("Failed to connect to MongoDB:", error);
  }
};

export default connectMongoDB;
