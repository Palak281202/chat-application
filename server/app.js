require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authCtrl = require("./controllers/auth");
const auth = require("./middlewares/auth");
const createnoteCtrl = require("./controllers/createnote");
const getnotesCtrl = require("./controllers/getNotes");
const deletenoteCtrl = require("./controllers/deleteNote");
const editnoteCtrl = require("./controllers/editNote");

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // or the actual frontend port you're using
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/api/auth/signup", authCtrl.signup);
app.post("/api/auth/login", authCtrl.login);
app.post("/api/createNote", auth, createnoteCtrl.createNote);
app.get("/api/getNotes", auth, getnotesCtrl.getNotes);
app.delete("/api/getNotes/:id", auth, deletenoteCtrl.deleteNote);
app.put("/api/getNotes/:id", auth, editnoteCtrl.editNote);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
