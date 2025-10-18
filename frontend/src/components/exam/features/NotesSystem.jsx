import React, { useState } from 'react';
import Note from './Note';
import { StickyNote } from 'lucide-react';

const NotesSystem = ({ notes, onNotesChange }) => {
  const [highestZ, setHighestZ] = useState(500);

  const createNote = (x = 100, y = 100, highlightedText = '') => {
    const newNote = {
      id: Date.now(),
      x: x,
      y: y,
      text: '',
      highlightedText: highlightedText,
      zIndex: highestZ + 1
    };
    
    setHighestZ(highestZ + 1);
    onNotesChange([...notes, newNote]);
  };

  const updateNote = (id, updates) => {
    onNotesChange(
      notes.map(note => 
        note.id === id ? { ...note, ...updates } : note
      )
    );
  };

  const deleteNote = (id) => {
    onNotesChange(notes.filter(note => note.id !== id));
  };

  const bringToFront = (id) => {
    const newZ = highestZ + 1;
    setHighestZ(newZ);
    updateNote(id, { zIndex: newZ });
  };

  return (
    <>
      <button 
        className="add-note-btn"
        onClick={() => createNote(window.innerWidth / 2 - 100, window.innerHeight / 2 - 100)}
        title="Add Note"
      >
        <StickyNote size={20} />
        Add Note
      </button>

      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          onUpdate={(updates) => updateNote(note.id, updates)}
          onDelete={() => deleteNote(note.id)}
          onBringToFront={() => bringToFront(note.id)}
        />
      ))}
    </>
  );
};

export default NotesSystem;