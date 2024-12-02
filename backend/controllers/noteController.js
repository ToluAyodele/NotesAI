const supabase = require('../models/supabase');

// Create a new note for the logged-in user
const createNote = async (req, res) => {
  const { content } = req.body;
  const { user } = req;

  const { data, error } = await supabase
    .from('notes')
    .insert([{ content, user_id: user.id }]);

   

  if (error) return res.status(400).send({ error: error.message });

  res.status(200).send(data);
};

// Get all notes for the logged-in user
const getAllNotes = async (req, res) => {
  const { user } = req;

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    return res.status(400).send({ error: error.message });
  }

  res.status(200).send(data);
};

// Edit an existing note for the logged-in user
const editNote = async (req, res) => {
    const { noteId, content } = req.body; // Ensure `noteId` and `content` are sent
    const { user } = req;
  
    if (!noteId || !content) {
      return res.status(400).send({ error: 'Note ID and content are required' });
    }
  
    // Verify the note belongs to the current user
    const { data: existingNote, error: fetchError } = await supabase
      .from('notes')
      .select('*')
      .eq('id', noteId)
      .eq('user_id', user.id)
      .single();
  
    if (fetchError || !existingNote) {
      return res.status(404).send({ error: 'Note not found or unauthorized' });
    }
  
    // Update the note content
    const { data, error } = await supabase
      .from('notes')
      .update(content) // Update both title and content
      .eq('id', noteId);
  
    if (error) {
      return res.status(400).send({ error: error.message });
    }
  
    res.status(200).send(data);
  };
  

module.exports = { createNote, getAllNotes, editNote };
