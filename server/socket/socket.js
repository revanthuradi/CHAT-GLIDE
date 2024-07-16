import express from "express";
import { Server } from "socket.io";
import http from "http";
import getUserDetailsFromToken from "../helper/getUserDetailsFromToken.js";
import User from "../Models/user.js";
import Conversation from "../Models/conversation.js";
import Message from "../Models/message.js";
import { getConversation } from "../helper/getConversation.js";
import * as dotenv from "dotenv";
dotenv.config();

export const app = express();
export const server = http.createServer(app);
console.log("estalishing socket connection....");
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

//online user
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("connected user", socket.id);

  const token = socket.handshake.auth.token;
  //current user
  const user = await getUserDetailsFromToken(token);

  //create room
  socket.join(user?._id.toString());
  onlineUser.add(user?._id.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", async (userID) => {
    const userDetails = await User.findOne({ _id: userID }).select("-password");

    const payload = {
      _id: userDetails?._id,
      userName: userDetails?.userName,
      email: userDetails?.email,
      profilePic: userDetails?.profilePic,
      online: onlineUser.has(userID),
    };
    socket.emit("message-user", payload);

    //get pervious msg
    const previousConversation = await Conversation.findOne({
      $or: [
        { sender: user?._id, receiver: userID },
        { sender: userID, receiver: user?._id },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });
    socket.emit("previous-conversation", previousConversation?.messages || []);

    //new message
    socket.on("new-message", async (data) => {
      let conversation = await Conversation.findOne({
        $or: [
          { sender: data.sender, receiver: data.receiver },
          { sender: data.receiver, receiver: data.sender },
        ],
      });

      if (!conversation) {
        const createdConverstion = new Conversation({
          sender: data.sender,
          receiver: data.receiver,
        });
        conversation = await createdConverstion.save();
      }

      const createdMessage = await Message.create({
        text: data.text,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        msgByUserId: data?.sender,
      });

      const updatedConversation = await Conversation.updateOne(
        { _id: conversation._id },
        {
          $push: { messages: createdMessage._id },
        }
      );

      const getConversationMessage = await Conversation.findOne({
        $or: [
          { sender: data.sender, receiver: data.receiver },
          { sender: data.receiver, receiver: data.sender },
        ],
      })
        .populate("messages")
        .sort({ updatedAt: -1 });

      io.to(data?.sender).emit(
        "message",
        getConversationMessage.messages || []
      );
      io.to(data?.receiver).emit(
        "message",
        getConversationMessage.messages || []
      );

      const conversationSender = await getConversation(data?.sender);
      const conversationReceiver = await getConversation(data?.receiver);
      console.log(conversationSender);

      io.to(data?.sender).emit("sidebar-chat", conversationSender);
      io.to(data?.receiver).emit("sidebar-chat", conversationReceiver);
    });
  });

  //sidebar

  socket.on("sidebar", async (currUser) => {
    const conversation = await getConversation(currUser);
    socket.emit("sidebar-chat", conversation);
  });

  socket.on("seen", async (messageByUserid) => {
    const conversation = await Conversation.findOne({
      $or: [
        { sender: user?._id, receiver: messageByUserid },
        { sender: messageByUserid, receiver: user?._id },
      ],
    });

    const conversationMessageId = conversation?.messages || [];
    const updateMessages = await Message.updateMany(
      {
        _id: { $in: conversationMessageId },
        msgByUserId: messageByUserid,
      },
      { $set: { seen: true } }
    );
    const conversationSender = await getConversation(user._id.toString());
    const conversationReceiver = await getConversation(messageByUserid);

    io.to(user._id?.toString()).emit("sidebar-chat", conversationSender);
    io.to(messageByUserid).emit("sidebar-chat", conversationReceiver);
  });

  //disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id, socket.id);
    io.emit("onlineUser", Array.from(onlineUser));
    console.log("disconnect user", socket.id);
  });
});
