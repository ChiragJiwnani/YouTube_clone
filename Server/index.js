//index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import videoroutes from "./Routes/video.js";
import userroutes from "./Routes/User.js";
import chatRoutes from "./Routes/chat.js";
import path from "path";
import commentroutes from "./Routes/comment.js";
import Chat from "./Models/chat.js"; // Import the chat model
import crypto from "crypto"; // Encryption library
import { createServer } from "http"; // To create an HTTP server
import socketServer from "./socket.js";
import { Server } from "socket.io"; // Import socket.io
import { exec } from "child_process";

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "abcdefghijklmnopqrstuvwxzy012345"; // Must be 32 characters for aes-256
const IV_LENGTH = 16; // For AES, the IV length should be 16 bytes

// Encrypt the message
const encryptMessage = (message) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-ctr",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

// Decrypt the message
const decryptMessage = (encryptedMessage) => {
  const [ivHex, encryptedText] = encryptedMessage.split(":"); // Separate the IV from the message
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Environment Variables
dotenv.config({ path: "./.env" });

// Express App Initialization
const app = express();
const server = createServer(app);
socketServer(server);

app.use(cors());
app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use("/uploads", express.static(path.join("uploads")));

app.get("/", (req, res) => {
  res.send("Your tube is working");
});

app.use(bodyParser.json());
app.use("/user", userroutes);
app.use("/video", videoroutes);
app.use("/comment", commentroutes);
app.use("/chat", chatRoutes);

// Initialize HTTP Server
const httpServer = createServer(app);
const PORT = process.env.PORT;

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    //origin: ["http://localhost:3000", "https://chirags-youtube-clone.vercel.app"],
    //origin: "*",
    origin: "https://youtubeclone-client.vercel.app", 
    methods: ["POST", "GET", "PATCH"],
    credentials: true,
    optionSuccessStatus: 200, // Set up the correct CORS for frontend access
  },
  transports: [ "polling"]
});

// Socket.io chat logic
io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId);
    console.log(`${userId} joined room ${roomId}`);
  });

  socket.on("chatMessage", async ({ roomId, userId, message }) => {
    console.log(
      `Message received from ${userId} in room ${roomId}: ${message}`
    );

    const encryptedMessage = encryptMessage(message);
    const newMessage = new Chat({ roomId, userId, message: encryptedMessage });

    await newMessage.save(); // Save to database

    // Decrypt message before emitting to clients
    const decryptedMessage = decryptMessage(encryptedMessage);

    // Emit the decrypted message to the room
    io.to(roomId).emit("message", { userId, message: decryptedMessage });
    console.log(`Message broadcasted to room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Proxy translation request to OpenNMT server
app.post("/translate", async (req, res) => {
  const { src, tgt } = req.body;
  const command = `curl -X POST https://chirags-youtube-clone.vercel.app/translate -H "Content-Type: application/json" -d '{"src": "${src}", "tgt": "${tgt}"}'`;

  exec(command, (error, stdout) => {
    if (error) {
      res.status(500).json({ error: "Translation failed." });
    } else {
      res.json(JSON.parse(stdout));
    }
  });
});

app.post("/api/send-email-otp", async (req, res) => {
  // your email OTP sending logic
});

app.post("/api/send-mobile-otp", async (req, res) => {
  // your mobile OTP sending logic
});

// MongoDB Connection and Server Listener
const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Mongodb Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Start both HTTP and Socket.io servers
httpServer.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
