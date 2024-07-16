import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect("mongodb+srv://revanthuradi9779:KuGSuKCJHBInrKBo@cluster0.tpatm17.mongodb.net/chatGlide");
    console.log("Database Connected...");
  } catch (err) {
    console.log("Database connection failed");
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;