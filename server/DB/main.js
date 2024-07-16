import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected...");
  } catch (err) {
    console.log("Database connection failed");
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;