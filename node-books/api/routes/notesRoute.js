const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const NotesController =  require('../controllers/notesController');

router.get('/', NotesController.notes_get_all);

router.get('/:noteId', NotesController.notes_get_id);

router.post('/', NotesController.notes_create);

router.delete('/', NotesController.notes_delete);

module.exports = router;
