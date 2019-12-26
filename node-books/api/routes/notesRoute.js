const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const NotesController = require("../controllers/notesController");

router.get("/", checkAuth, NotesController.get_note_book);

router.get("/:noteId", checkAuth, NotesController.get_note_id);

router.post("/", checkAuth, NotesController.create_note);

router.delete("/:noteId", checkAuth, NotesController.note_delete);

module.exports = router;
