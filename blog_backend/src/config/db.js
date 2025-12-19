import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 🔍 TEMP DEBUG (REMOVE AFTER FIX)
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
