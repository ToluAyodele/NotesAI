import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewNote = () => {
  const [note, setNote] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      // Make the POST request with the Authorization header
      const response = await axios.post(
        'http://localhost:5000/api/notes',
        note,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("New note created:", response.data);

      // Navigate to notes dashboard after successful creation
      navigate('/notes');
    } catch (error) {
      console.error("Error creating note:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <h2>Create New Note</h2>
      <form onSubmit={handleCreate}>
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
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
};

export default NewNote;
