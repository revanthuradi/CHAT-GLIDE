import { Router } from "express";
import { findUser } from "../Controllers/user.js";
const userRouter = Router();

userRouter.get("/find-user", findUser);

export default userRouter;
