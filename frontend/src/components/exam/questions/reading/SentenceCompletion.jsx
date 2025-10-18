import React from 'react';

const SentenceCompletion = ({ question, answer, onAnswerChange }) => {
  const { sentences, passage, context, wordLimit } = question.payload || {};

  const handleInputChange = (index, value) => {
    const newAnswer = Array.isArray(answer) ? [...answer] : [];
    newAnswer[index] = value;
    onAnswerChange(newAnswer);
  };

  const renderSentenceWithBlank = (sentence, index) => {
    const text = sentence.text || sentence;
    const parts = text.split(/____+|\[\s*\]|\{\s*\}/);
    
    if (parts.length === 1) {
      return (
        <div key={index} className="sentence-item">
          <span className="sentence-number">{sentence.number || (question.index + index)}.</span>
          <span className="sentence-text">{text}</span>
          <input
            type="text"
            className="sentence-input"
            value={(answer && answer[index]) || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            maxLength={sentence.maxLength || 20}
            autoComplete="off"
          />
        </div>
      );
    }

    return (
      <div key={index} className="sentence-item">
        <span className="sentence-number">{sentence.number || (question.index + index)}.</span>
        <span className="sentence-text">{parts[0]}</span>
        <input
          type="text"
          className="sentence-input inline"
          value={(answer && answer[index]) || ''}
          onChange={(e) => handleInputChange(index, e.target.value)}
          maxLength={sentence.maxLength || 20}
          autoComplete="off"
        />
        {parts[1] && <span className="sentence-text">{parts[1]}</span>}
      </div>
    );
  };

  return (
    <div className="sentence-completion-reading-question">
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

      <div className="sentences-list">
        {sentences && sentences.map((sentence, index) => 
          renderSentenceWithBlank(sentence, index)
        )}
      </div>
    </div>
  );
};

export default SentenceCompletion;