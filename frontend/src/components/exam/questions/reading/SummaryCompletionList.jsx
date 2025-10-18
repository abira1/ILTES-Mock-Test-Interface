import React from 'react';

const SummaryCompletionList = ({ question, answer, onAnswerChange }) => {
  const { summary, options, passage, context } = question.payload || {};

  const handleSelectChange = (blankIndex, value) => {
    const newAnswer = { ...(answer || {}) };
    newAnswer[blankIndex] = value;
    onAnswerChange(newAnswer);
  };

  const renderSummaryWithDropdowns = () => {
    if (!summary) return null;

    const text = summary.text || summary;
    const parts = [];
    let lastIndex = 0;
    let blankIndex = 0;
    const blankRegex = /____+|\[\s*\]|\{\s*\}/g;
    let match;

    while ((match = blankRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      parts.push(
        <select
          key={`blank-${blankIndex}`}
          className="summary-dropdown inline"
          value={(answer && answer[blankIndex]) || ''}
          onChange={(e) => handleSelectChange(blankIndex, e.target.value)}
        >
          <option value="">Select...</option>
          {options && options.map((option, optIndex) => (
            <option key={optIndex} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      );

      lastIndex = match.index + match[0].length;
      blankIndex++;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return <div className="summary-text">{parts}</div>;
  };

  return (
    <div className="summary-completion-list-question">
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

      {options && (
        <div className="options-box">
          <h4>Choose from the list:</h4>
          <div className="options-grid">
            {options.map((option, index) => (
              <div key={index} className="option-item">
                <strong>{option.value || option}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="summary-container">
        {renderSummaryWithDropdowns()}
      </div>
    </div>
  );
};

export default SummaryCompletionList;