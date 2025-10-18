import React, { useState, useRef, useEffect } from 'react';
import { X, GripVertical } from 'lucide-react';

const Note = ({ note, onUpdate, onDelete, onBringToFront }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const noteRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.note-close') || e.target.closest('.note-content')) {
      return;
    }

    setIsDragging(true);
    setDragStart({
      x: e.clientX - note.x,
      y: e.clientY - note.y
    });
    onBringToFront();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    onUpdate({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const handleTextChange = (e) => {
    onUpdate({ text: e.target.textContent });
  };

  const handleClick = () => {
    onBringToFront();
  };

  return (
    <div
      ref={noteRef}
      className="note"
      style={{
        left: `${note.x}px`,
        top: `${note.y}px`,
        zIndex: note.zIndex,
        position: 'fixed'
      }}
      onClick={handleClick}
    >
      <div className="note-header" onMouseDown={handleMouseDown}>
        <GripVertical size={16} className="note-drag-handle" />
        <button className="note-close" onClick={onDelete}>
          <X size={16} />
        </button>
      </div>

      <div className="note-body">
        {note.highlightedText && (
          <div className="note-highlighted-text">
            {note.highlightedText}
          </div>
        )}
        
        <div
          className="note-content"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTextChange}
          onKeyUp={handleTextChange}
        >
          {note.text}
        </div>
      </div>
    </div>
  );
};

export default Note;