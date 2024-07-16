import express from "express";
import { logIn, signUp } from "../Controllers/auth.js";
const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);

export default authRouter;