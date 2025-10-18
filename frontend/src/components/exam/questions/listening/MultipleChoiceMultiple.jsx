import React from 'react';

const MultipleChoiceMultiple = ({ question, answer, onAnswerChange }) => {
  const { prompt, options, context, maxSelections } = question.payload || {};

  const handleOptionToggle = (optionValue) => {
    const currentAnswer = Array.isArray(answer) ? answer : [];
    const newAnswer = currentAnswer.includes(optionValue)
      ? currentAnswer.filter(v => v !== optionValue)
      : [...currentAnswer, optionValue];

    // Check max selections limit
    if (maxSelections && newAnswer.length > maxSelections) {
      return; // Don't allow more selections
    }

    onAnswerChange(newAnswer);
  };

  const currentSelections = Array.isArray(answer) ? answer : [];

  return (
    <div className="multiple-choice-multiple-question">
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

      {maxSelections && (
        <div className="selection-limit">
          Select up to {maxSelections} option{maxSelections > 1 ? 's' : ''}
          {currentSelections.length > 0 && (
            <span className="selection-count">
              {' '}({currentSelections.length}/{maxSelections} selected)
            </span>
          )}
        </div>
      )}

      <div className="mcq-options multiple">
        {options && options.map((option, index) => {
          const optionValue = option.value || option.label || String.fromCharCode(65 + index);
          const isSelected = currentSelections.includes(optionValue);
          const isDisabled = maxSelections && currentSelections.length >= maxSelections && !isSelected;

          return (
            <label 
              key={index} 
              className={`mcq-option ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
            >
              <input
                type="checkbox"
                value={optionValue}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => handleOptionToggle(optionValue)}
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

export default MultipleChoiceMultiple;