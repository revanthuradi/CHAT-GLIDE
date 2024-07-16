import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../Models/user.js";

export const signUp = async (req, res) => {
  const { userName, email, password, profilePic } = req.body;
  try {
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      res.status(400).json({
        message: "User already exists with this email",
      });
    } else {
      const hash = bcrypt.hashSync(password, 12);
      const token = jwt.sign({ email }, process.env.PRIVATE_KEY);
      const newUser = await User.create({
        userName: userName,
        email,
        password: hash,
        profilePic: profilePic,
      });

      res.status(201).json({
        message: "user created succesfully",
        token,
        user: {
          userName: newUser.userName,
          email: newUser.email,
          userID: newUser._id,
          profilePic: newUser.profilePic,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "UserName not available",
    });
  }
};
export const logIn = async (req, res) => {
  const { userName, password } = req.body;
  // console.log(userName)
  try {
    const user = await User.findOne({ userName });
    // console.log(user)
    if (!user) {
      res.status(400).json({
        message: "user doesn't exists",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign({ email: user.email }, process.env.PRIVATE_KEY);
        res.status(201).json({
          message: "logged in successfully",
          token,
          user: {
            userName: user.userName,
            email: user.email,
            userID: user._id,
            profilePic: user.profilePic,
          },
        });
      } else {
        res.status(400).json({
          message: "Incorrect password",
        });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
