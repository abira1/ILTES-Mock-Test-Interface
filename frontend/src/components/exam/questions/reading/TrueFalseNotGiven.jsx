import React from 'react';

const TrueFalseNotGiven = ({ question, answer, onAnswerChange }) => {
  const { statements, passage, context } = question.payload || {};
  const isYesNo = question.type === 'yes_no_not_given';

  const options = isYesNo 
    ? ['YES', 'NO', 'NOT GIVEN']
    : ['TRUE', 'FALSE', 'NOT GIVEN'];

  const handleAnswerChange = (statementIndex, value) => {
    const newAnswer = Array.isArray(answer) ? {...answer} : {};
    newAnswer[statementIndex] = value;
    onAnswerChange(newAnswer);
  };

  return (
    <div className="true-false-not-given-question">
      {context && (
        <div className="question-context">
          {context}
        </div>
      )}

      {passage && (
        <div className="reading-passage">
          <div className="passage-content">{passage}</div>
        </div>
      )}

      <div className="statements-list">
        {statements && statements.map((statement, index) => {
          const currentAnswer = answer && answer[index];

          return (
            <div key={index} className="statement-item">
              <div className="statement-number">{statement.number || (question.index + index)}.</div>
              <div className="statement-content">
                <div className="statement-text">{statement.text}</div>
                <div className="statement-options">
                  {options.map((option) => (
                    <label key={option} className={`option-btn ${currentAnswer === option ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name={`statement-${index}`}
                        value={option}
                        checked={currentAnswer === option}
                        onChange={() => handleAnswerChange(index, option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrueFalseNotGiven;