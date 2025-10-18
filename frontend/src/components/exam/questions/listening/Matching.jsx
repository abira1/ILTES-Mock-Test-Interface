import React from 'react';

const Matching = ({ question, answer, onAnswerChange }) => {
  const { items, options, context, instructions } = question.payload || {};

  const handleMatchChange = (itemIndex, value) => {
    const newAnswer = { ...(answer || {}) };
    newAnswer[itemIndex] = value;
    onAnswerChange(newAnswer);
  };

  return (
    <div className="matching-question">
      {context && (
        <div className="question-context">
          {context}
        </div>
      )}

      {instructions && (
        <div className="matching-instructions">
          {instructions}
        </div>
      )}

      {options && (
        <div className="matching-options-box">
          <h4>Options:</h4>
          <ul className="options-list">
            {options.map((option, index) => (
              <li key={index}>
                <strong>{option.value || String.fromCharCode(65 + index)}</strong> - {option.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="matching-items-section">
        {items && items.map((item, index) => (
          <div key={index} className="matching-item">
            <div className="item-number">{item.number || (question.index + index)}.</div>
            <div className="item-content">{item.text}</div>
            <select
              className="match-dropdown"
              value={(answer && answer[index]) || ''}
              onChange={(e) => handleMatchChange(index, e.target.value)}
            >
              <option value="">Select...</option>
              {options && options.map((option, optIndex) => (
                <option key={optIndex} value={option.value || String.fromCharCode(65 + optIndex)}>
                  {option.value || String.fromCharCode(65 + optIndex)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matching;