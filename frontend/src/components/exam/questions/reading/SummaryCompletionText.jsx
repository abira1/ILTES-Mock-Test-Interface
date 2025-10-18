import React from 'react';

const SummaryCompletionText = ({ question, answer, onAnswerChange }) => {
  const { summary, passage, context, wordLimit } = question.payload || {};

  const handleInputChange = (blankIndex, value) => {
    const newAnswer = { ...(answer || {}) };
    newAnswer[blankIndex] = value;
    onAnswerChange(newAnswer);
  };

  const renderSummaryWithInputs = () => {
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
        <input
          key={`blank-${blankIndex}`}
          type="text"
          className="summary-input inline"
          value={(answer && answer[blankIndex]) || ''}
          onChange={(e) => handleInputChange(blankIndex, e.target.value)}
          maxLength={wordLimit || 20}
          autoComplete="off"
          placeholder={`${question.index + blankIndex}`}
        />
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
    <div className="summary-completion-text-question">
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

      {wordLimit && (
        <div className="word-limit-notice">
          Write NO MORE THAN {wordLimit} WORD{wordLimit > 1 ? 'S' : ''} for each answer.
        </div>
      )}

      <div className="summary-container">
        {renderSummaryWithInputs()}
      </div>
    </div>
  );
};

export default SummaryCompletionText;