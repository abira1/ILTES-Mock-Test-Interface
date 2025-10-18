import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Sentence Completion - Listening
 * Complete sentences with missing words
 */
const SentenceCompletion = ({ question, answer, onChange }) => {
  const prompt = question.payload?.prompt || question.prompt || '';
  const maxWords = question.payload?.max_words || 2;
  
  // Split prompt by __BLANK__ or similar markers and render with inline input
  const renderPromptWithInput = () => {
    // Check for __BLANK__ marker
    if (prompt.includes('__BLANK__')) {
      const parts = prompt.split('__BLANK__');
      return (
        <div className="flex items-center flex-wrap gap-2">
          <span>{parts[0]}</span>
          <input
            type="text"
            value={answer || ''}
            onChange={(e) => onChange(e.target.value)}
            className="inline-block px-3 py-1 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none min-w-[120px] max-w-[200px]"
            placeholder="Your answer"
          />
          <span>{parts[1] || ''}</span>
        </div>
      );
    }
    
    // Check for _____ marker
    if (prompt.includes('_____')) {
      const parts = prompt.split('_____');
      return (
        <div className="flex items-center flex-wrap gap-2">
          <span>{parts[0]}</span>
          <input
            type="text"
            value={answer || ''}
            onChange={(e) => onChange(e.target.value)}
            className="inline-block px-3 py-1 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none min-w-[120px] max-w-[200px]"
            placeholder="Your answer"
          />
          <span>{parts[1] || ''}</span>
        </div>
      );
    }
    
    // No blank marker, show prompt and input below
    return (
      <div>
        <p className="mb-3">{prompt}</p>
        <input
          type="text"
          value={answer || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          placeholder="Your answer"
        />
      </div>
    );
  };
  
  return (
    <QuestionBase questionNumber={question.index} questionType="sentence-completion">
      <div className="flex items-start gap-3 mb-4">
        <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
          {question.index}.
        </span>
        <div className="flex-1">
          <div className="text-gray-800 leading-relaxed">
            {renderPromptWithInput()}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Write NO MORE THAN {maxWords} {maxWords === 1 ? 'WORD' : 'WORDS'}
          </p>
        </div>
      </div>
    </QuestionBase>
  );
};

export default SentenceCompletion;