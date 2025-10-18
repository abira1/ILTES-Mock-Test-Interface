import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Note Completion - Reading
 * Complete notes using words from the passage
 */
const NoteCompletion = ({ question, answer, onChange }) => {
  const title = question.payload?.title || 'Notes';
  const notes = question.payload?.notes || [];
  const maxWords = question.payload?.max_words || 2;
  
  const handleNoteChange = (noteIndex, value) => {
    if (notes.length === 1) {
      onChange(value);
    } else {
      const currentAnswers = typeof answer === 'object' && answer !== null ? answer : {};
      onChange({
        ...currentAnswers,
        [noteIndex]: value
      });
    }
  };
  
  const getNoteValue = (noteIndex) => {
    if (notes.length === 1) {
      return answer || '';
    }
    return (typeof answer === 'object' && answer !== null ? answer[noteIndex] : '') || '';
  };
  
  const renderNoteWithBlank = (note, idx) => {
    const text = note.text || note;
    
    if (text.includes('__BLANK__')) {
      const parts = text.split('__BLANK__');
      return (
        <div className="flex items-center flex-wrap gap-2" key={idx}>
          <span>{parts[0]}</span>
          <input
            type="text"
            value={getNoteValue(idx)}
            onChange={(e) => handleNoteChange(idx, e.target.value)}
            className="inline-block px-3 py-1 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none min-w-[100px] max-w-[180px]"
            placeholder="..."
          />
          <span>{parts[1] || ''}</span>
        </div>
      );
    }
    
    return <p key={idx} className="text-gray-800">{text}</p>;
  };
  
  return (
    <QuestionBase questionNumber={question.index} questionType="note-completion">
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
            {question.index}.
          </span>
          <h4 className="font-semibold text-gray-800 text-lg">{title}</h4>
        </div>
        
        <div className="ml-12 space-y-2">
          {notes.map((note, idx) => renderNoteWithBlank(note, idx))}
          <p className="text-xs text-gray-500 mt-2">
            Use NO MORE THAN {maxWords} {maxWords === 1 ? 'WORD' : 'WORDS'} from the passage
          </p>
        </div>
      </div>
    </QuestionBase>
  );
};

export default NoteCompletion;