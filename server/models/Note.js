const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
