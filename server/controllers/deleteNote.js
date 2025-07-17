const Note = require("../models/Note.js");

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findOneAndDelete({ _id: noteId, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: "Note not found or unauthorized user!" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};