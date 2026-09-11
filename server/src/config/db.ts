import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("MongoDB connection failed:", message);
    throw error;
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
});

async function handleGracefulShutdown(signal: string): Promise<void> {
  console.log(`Received ${signal}. Closing MongoDB connection...`);

  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Failed to close MongoDB connection cleanly:", error);
    process.exit(1);
  }
}

process.once("SIGINT", () => {
  void handleGracefulShutdown("SIGINT");
});

process.once("SIGTERM", () => {
  void handleGracefulShutdown("SIGTERM");
});
