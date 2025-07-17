const Note = require("../models/Note");

exports.editNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, text } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: req.user.id },
      { title, text },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
