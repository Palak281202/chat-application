const Note = require("../models/Note.js");

exports.createNote = async (req, res) => {
  const { title, text } = req.body;
  
  try {
    console.log("1")
    const user = new Note({ title, text, user: req.user.id });
    console.log("2")
    await user.save();
    res.status(201).send("Note created Successfully!");
  } catch (err) {
    console.log("3")
    res.status(400).send(err.message);
    console.log("4")
  }
};
