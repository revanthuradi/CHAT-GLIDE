import { app, server } from "./socket/socket.js";
import express from "express";
import connectDB from "./DB/main.js";
import authRouter from "./Routes/auth.js";
import userRouter from "./Routes/user.js";
import { tokenVerify } from "./Middleware/token.js";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.use(
    cors({
      origin: ["https://chat-glide-frontend.vercel.app"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
  );

  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/api", tokenVerify, userRouter);

  server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
});
