import React from 'react';

const FillInGapsShortAnswers = ({ question, answer, onAnswerChange }) => {
  const { questions, prompt, context } = question.payload || {};

  const handleInputChange = (index, value) => {
    const newAnswer = Array.isArray(answer) ? [...answer] : [];
    newAnswer[index] = value;
    onAnswerChange(newAnswer);
  };

  const renderPromptWithBlanks = (text, startIndex = 0) => {
    if (!text) return null;

    const parts = [];
    let lastIndex = 0;
    let blankIndex = startIndex;
    const blankRegex = /____+|\[\s*\]|\{\s*\}/g;
    let match;

    while ((match = blankRegex.exec(text)) !== null) {
      // Add text before the blank
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Add input field
      parts.push(
        <input
          key={`blank-${blankIndex}`}
          type="text"
          className="gap-input inline-input"
          value={(answer && answer[blankIndex]) || ''}
          onChange={(e) => handleInputChange(blankIndex, e.target.value)}
          maxLength={20}
          autoComplete="off"
        />
      );

      lastIndex = match.index + match[0].length;
      blankIndex++;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return <div className="prompt-line">{parts}</div>;
  };

  return (
    <div className="fill-in-gaps-short-answers-question">
      {context && (
        <div className="question-context">
          {context}
        </div>
      )}

      {prompt && (
        <div className="question-prompt">
          {renderPromptWithBlanks(prompt)}
        </div>
      )}

      {questions && (
        <div className="short-answer-questions">
          {questions.map((q, index) => (
            <div key={index} className="short-answer-item">
              <span className="question-number">{q.number || (question.index + index)}.</span>
              {q.prompt ? (
                renderPromptWithBlanks(q.prompt, index)
              ) : (
                <input
                  type="text"
                  className="short-answer-input"
                  value={(answer && answer[index]) || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  maxLength={q.maxLength || 20}
                  autoComplete="off"
                  placeholder={q.placeholder || ''}
                />
              )}
            </div>
          ))}
        </div>
      )}

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

export default FillInGapsShortAnswers;