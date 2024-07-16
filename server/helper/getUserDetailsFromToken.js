import User from "../Models/user.js";
import jwt from "jsonwebtoken";
const getUserDetailsFromToken = async (token) => {
  try {
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await User.findOne({ email: decode.email }).select(
      "-password -email"
    );
    return user;
  } catch (err) {
    console.log("error",err.message)
  }
};

export default getUserDetailsFromToken;
