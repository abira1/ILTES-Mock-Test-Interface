import React from 'react';

const MultipleChoiceSingle = ({ question, answer, onAnswerChange }) => {
  const { prompt, options, context } = question.payload || {};

  const handleOptionSelect = (optionValue) => {
    onAnswerChange(optionValue);
  };

  return (
    <div className="multiple-choice-single-question">
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

      {question.payload?.image && (
        <img 
          src={question.payload.image} 
          alt="Question diagram"
          className="question-image"
        />
      )}
    </div>
  );
};

export default MultipleChoiceSingle;