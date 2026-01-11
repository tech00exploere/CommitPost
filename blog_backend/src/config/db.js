import mongoose from "mongoose";
const connectDB=async()=>{
  try{
    if (!process.env.MONGO_URI){
      throw new Error("MONGO_URI is not defined");
    }
    const conn =await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
    });
    console.log(`MongoDB Connected:${conn.connection.host}`);
  }catch(error){
    console.error("MongoDB connection failed");
    console.error(error.message);
    throw error;
  }
};
export default connectDB;
