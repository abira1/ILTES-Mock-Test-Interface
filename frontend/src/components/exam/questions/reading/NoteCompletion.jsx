import React from 'react';

const NoteCompletion = ({ question, answer, onAnswerChange }) => {
  const { notes, passage, context, wordLimit } = question.payload || {};

  const handleInputChange = (index, value) => {
    const newAnswer = Array.isArray(answer) ? [...answer] : [];
    newAnswer[index] = value;
    onAnswerChange(newAnswer);
  };

  const renderNoteWithBlank = (note, index) => {
    const text = note.text || note;
    const parts = text.split(/____+|\[\s*\]|\{\s*\}/);
    
    if (parts.length === 1) {
      return (
        <div key={index} className="note-item">
          <span className="note-number">{note.number || (question.index + index)}.</span>
          <span className="note-text">{text}</span>
          <input
            type="text"
            className="note-input"
            value={(answer && answer[index]) || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            maxLength={note.maxLength || 20}
            autoComplete="off"
          />
        </div>
      );
    }

    return (
      <div key={index} className="note-item">
        <span className="note-number">{note.number || (question.index + index)}.</span>
        <span className="note-text">{parts[0]}</span>
        <input
          type="text"
          className="note-input inline"
          value={(answer && answer[index]) || ''}
          onChange={(e) => handleInputChange(index, e.target.value)}
          maxLength={note.maxLength || 20}
          autoComplete="off"
        />
        {parts[1] && <span className="note-text">{parts[1]}</span>}
      </div>
    );
  };

  return (
    <div className="note-completion-question">
      {passage && (
        <div className="reading-passage">
          <div className="passage-content">{passage}</div>
        </div>
      )}

      {context && (
        <div className="question-context">
          {context}
        </div>
      )}

      {wordLimit && (
        <div className="word-limit-notice">
          Write NO MORE THAN {wordLimit} WORD{wordLimit > 1 ? 'S' : ''} for each answer.
        </div>
      )}

      <div className="notes-container">
        {notes && notes.map((note, index) => 
          renderNoteWithBlank(note, index)
        )}
      </div>
    </div>
  );
};

export default NoteCompletion;