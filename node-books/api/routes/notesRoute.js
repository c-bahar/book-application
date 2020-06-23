/* eslint-disable no-undef */
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const NotesController = require("../controllers/notesController");

router.get("/all", NotesController.note_list_all);

router.get("/", checkAuth, NotesController.note_list_book);

router.get("/:noteId", checkAuth, NotesController.note_detail);

router.post("/", checkAuth, NotesController.note_create_post);

router.delete("/:noteId", checkAuth, NotesController.note_delete);

module.exports = router;
