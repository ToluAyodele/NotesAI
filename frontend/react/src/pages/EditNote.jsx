import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditNote = () => {
  const [note, setNote] = useState({ title: '', content: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };
    fetchNote();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/notes/${id}`, note);
      console.log("Note updated:", response);
      navigate('/notes');  // Redirect to notes dashboard
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Content"
        ></textarea>
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default EditNote;
