require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authCtrl = require("./controllers/auth");
const chatCtrl = require("./controllers/chat");
const auth = require("./middlewares/auth");

const app = express();
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3001", // or the actual frontend port you're using
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post("/api/auth/signup", authCtrl.signup);
app.post("/api/auth/login", authCtrl.login);

app.post("/api/chat", auth, chatCtrl.createChat);
app.get("/api/chat/respond/:token", chatCtrl.respondInvite);
app.get("/api/chats", auth, chatCtrl.getChats);
app.post("/api/chat/join", auth, chatCtrl.joinChat);
app.get("/api/chat/:chatId/messages", auth, chatCtrl.getMessages);
app.post("/api/chat/:chatId/message", auth, chatCtrl.sendMessage);

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT}`));
