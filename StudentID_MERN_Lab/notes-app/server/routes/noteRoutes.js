const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// POST /api/notes -> persist a new note, return 201 with the saved document
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Both title and content are required." });
    }

    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (err) {
    console.error("POST /api/notes failed:", err.message);
    res.status(500).json({ message: "Could not save the note." });
  }
});

// GET /api/notes -> all notes, newest first
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("GET /api/notes failed:", err.message);
    res.status(500).json({ message: "Could not load the notes." });
  }
});

// DELETE /api/notes/:id -> remove by MongoDB _id, 404 when it does not exist
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({ message: "Note deleted.", id: req.params.id });
  } catch (err) {
    console.error("DELETE /api/notes/:id failed:", err.message);
    res.status(500).json({ message: "Could not delete the note." });
  }
});

module.exports = router;
