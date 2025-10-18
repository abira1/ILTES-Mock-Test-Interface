import React from 'react';

const MatchingSentenceEndings = ({ question, answer, onAnswerChange }) => {
  const { sentenceStarters, endings, passage, context } = question.payload || {};

  const handleEndingChange = (starterIndex, value) => {
    const newAnswer = { ...(answer || {}) };
    newAnswer[starterIndex] = value;
    onAnswerChange(newAnswer);
  };

  return (
    <div className="matching-sentence-endings-question">
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

      {endings && (
        <div className="endings-box">
          <h4>Sentence Endings:</h4>
          <ul className="endings-list">
            {endings.map((ending, index) => (
              <li key={index}>
                <strong>{ending.value || String.fromCharCode(65 + index)}</strong> {ending.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="sentence-starters-section">
        {sentenceStarters && sentenceStarters.map((starter, index) => (
          <div key={index} className="sentence-matching-item">
            <div className="starter-info">
              <span className="question-number">{starter.number || (question.index + index)}.</span>
              <span className="starter-text">{starter.text}</span>
            </div>
            <select
              className="ending-dropdown"
              value={(answer && answer[index]) || ''}
              onChange={(e) => handleEndingChange(index, e.target.value)}
            >
              <option value="">Select ending...</option>
              {endings && endings.map((ending, eIndex) => (
                <option key={eIndex} value={ending.value || String.fromCharCode(65 + eIndex)}>
                  {ending.value || String.fromCharCode(65 + eIndex)} - {ending.text}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingSentenceEndings;