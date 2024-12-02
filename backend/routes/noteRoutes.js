const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a note
router.post('/notes', authMiddleware, noteController.createNote);

// Route to get all notes for the logged-in user
router.get('/notes', authMiddleware, noteController.getAllNotes);

// Route to edit an existing note
router.put('/notes/edit', authMiddleware, noteController.editNote);

module.exports = router;
