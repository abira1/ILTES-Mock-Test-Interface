import React from 'react';

const MultipleChoiceSingle = ({ question, answer, onAnswerChange }) => {
  const { prompt, options, passage, context } = question.payload || {};

  const handleOptionSelect = (optionValue) => {
    onAnswerChange(optionValue);
  };

  return (
    <div className="multiple-choice-single-reading-question">
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

      {prompt && (
        <div className="question-prompt">
          {prompt}
        </div>
      )}

      <div className="mcq-options">
        {options && options.map((option, index) => {
          const optionValue = option.value || option.label || String.fromCharCode(65 + index);
          const isSelected = answer === optionValue;

          return (
            <label 
              key={index} 
              className={`mcq-option ${isSelected ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={`question-${question.index}`}
                value={optionValue}
                checked={isSelected}
                onChange={() => handleOptionSelect(optionValue)}
              />
              <span className="option-label">{optionValue}</span>
              <span className="option-text">{option.text || option.content}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoiceSingle;