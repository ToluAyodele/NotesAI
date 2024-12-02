import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot'; 

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editContent, setEditContent] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:5000/api/notes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  const handleEdit = (note) => {
    setEditNoteId(note.id);
    setEditContent({ title: note.title, content: note.content });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const response = await axios.put(
        'http://localhost:5000/api/notes/edit', // Correct route
        {
          noteId: editNoteId,
          content: {
            // title: editContent.title,
            content: editContent.content,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Update response:', response.data);
  
      // Update notes in state
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editNoteId
          ? { ...note, content: editContent.content }
            // ? { ...note, title: editContent.title, content: editContent.content }
            : note
        )
      );
  
      // Reset editing state
      setEditNoteId(null);
      setEditContent({ title: '', content: '' });
      console.log('Note updated successfully');
    } catch (error) {
      console.error('Error saving the note:', error.response?.data || error.message);
    }
  };
  

  const handleChange = (e) => {
    setEditContent({ ...editContent, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Your Notes</h2>
      {notes.length > 0 ? (
        <div>
          {notes.map((note) => (
            <div key={note.id} style={styles.noteCard}>
              {editNoteId === note.id ? (
                <div style={styles.editContainer}>
                  <input
                    type="text"
                    name="title"
                    value={editContent.title}
                    onChange={handleChange}
                    placeholder="Edit title"
                    style={styles.input}
                  />
                  <textarea
                    name="content"
                    value={editContent.content}
                    onChange={handleChange}
                    placeholder="Edit content"
                    style={styles.textarea}
                  />
                  <button onClick={handleSave} style={styles.saveButton}>
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={styles.editIcon}
                    onClick={() => handleEdit(note)}
                  />
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No notes available</p>
      )}
      <Chatbot />
      <button onClick={handleLogout} style={styles.logoutButton}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </div>
  );
};

const styles = {
  noteCard: {
    backgroundColor: '#1e1e1e',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '5px',
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    cursor: 'pointer',
    color: '#aaa',
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #444',
    backgroundColor: '#2b2b2b',
    color: '#fff',
  },
  textarea: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #444',
    backgroundColor: '#2b2b2b',
    color: '#fff',
    resize: 'none',
  },
  saveButton: {
    padding: '8px 12px',
    backgroundColor: '#5a5a5a',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: '20px',
    backgroundColor: '#333',
    padding: '10px 20px',
    borderRadius: '5px',
  },
};

export default Notes;
