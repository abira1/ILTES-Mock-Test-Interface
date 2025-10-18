import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Fill in the Gaps (Short Answers) - Listening
 * Complete sentences with short answers (multiple blanks)
 */
const FillInGapsShortAnswers = ({ question, answer, onChange }) => {
  const sentences = question.payload?.sentences || [];
  const maxWords = question.payload?.max_words || 2;
  
  // Handle multiple sentence blanks
  const handleChange = (sentenceIndex, value) => {
    if (sentences.length === 1) {
      onChange(value);
    } else {
      const currentAnswers = typeof answer === 'object' && answer !== null ? answer : {};
      onChange({
        ...currentAnswers,
        [sentenceIndex]: value
      });
    }
  };
  
  const getValue = (sentenceIndex) => {
    if (sentences.length === 1) {
      return answer || '';
    }
    return (typeof answer === 'object' && answer !== null ? answer[sentenceIndex] : '') || '';
  };
  
  const renderSentenceWithBlank = (sentence, idx) => {
    const text = sentence.text || sentence;
    
    if (text.includes('__BLANK__')) {
      const parts = text.split('__BLANK__');
      return (
        <div className="flex items-center flex-wrap gap-2" key={idx}>
          <span>{parts[0]}</span>
          <input
            type="text"
            value={getValue(idx)}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="inline-block px-3 py-1 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none min-w-[100px] max-w-[180px]"
            placeholder="..."
          />
          <span>{parts[1] || ''}</span>
        </div>
      );
    }
    
    return <p key={idx}>{text}</p>;
  };
  
  return (
    <QuestionBase questionNumber={question.index} questionType="fill-in-gaps-short-answers">
      <div className="flex items-start gap-3 mb-4">
        <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
          {question.index}.
        </span>
        <div className="flex-1">
          <div className="space-y-2 text-gray-800">
            {sentences.map((sentence, idx) => renderSentenceWithBlank(sentence, idx))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Write NO MORE THAN {maxWords} {maxWords === 1 ? 'WORD' : 'WORDS'}
          </p>
        </div>
      </div>
    </QuestionBase>
  );
};

export default FillInGapsShortAnswers;