import React from 'react';

const MatchingFeatures = ({ question, answer, onAnswerChange }) => {
  const { statements, features, passage, context } = question.payload || {};

  const handleMatchChange = (statementIndex, value) => {
    const newAnswer = { ...(answer || {}) };
    newAnswer[statementIndex] = value;
    onAnswerChange(newAnswer);
  };

  return (
    <div className="matching-features-question">
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

      {features && (
        <div className="features-box">
          <h4>Features:</h4>
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index}>
                <strong>{feature.value || String.fromCharCode(65 + index)}</strong> - {feature.text || feature.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="statements-section">
        {statements && statements.map((statement, index) => (
          <div key={index} className="matching-item">
            <span className="item-number">{statement.number || (question.index + index)}.</span>
            <span className="item-text">{statement.text}</span>
            <select
              className="match-dropdown"
              value={(answer && answer[index]) || ''}
              onChange={(e) => handleMatchChange(index, e.target.value)}
            >
              <option value="">Select...</option>
              {features && features.map((feature, fIndex) => (
                <option key={fIndex} value={feature.value || String.fromCharCode(65 + fIndex)}>
                  {feature.value || String.fromCharCode(65 + fIndex)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingFeatures;