import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <Link to={`/edit-note/${note.id}`}>Edit</Link>
    </div>
  );
};

export default NoteCard;
