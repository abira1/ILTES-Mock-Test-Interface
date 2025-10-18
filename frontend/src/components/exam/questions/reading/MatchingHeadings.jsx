import React from 'react';

const MatchingHeadings = ({ question, answer, onAnswerChange }) => {
  const { paragraphs, headings, passage, context } = question.payload || {};

  const handleHeadingChange = (paragraphIndex, value) => {
    const newAnswer = { ...(answer || {}) };
    newAnswer[paragraphIndex] = value;
    onAnswerChange(newAnswer);
  };

  return (
    <div className="matching-headings-question">
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

      {headings && (
        <div className="headings-box">
          <h4>List of Headings:</h4>
          <ul className="headings-list">
            {headings.map((heading, index) => (
              <li key={index}>
                <strong>{heading.value || (index + 1)}</strong> - {heading.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="paragraphs-section">
        {paragraphs && paragraphs.map((paragraph, index) => (
          <div key={index} className="paragraph-matching-item">
            <div className="paragraph-info">
              <span className="paragraph-label">Paragraph {paragraph.label || String.fromCharCode(65 + index)}</span>
              <span className="question-number">{paragraph.questionNumber || (question.index + index)}</span>
            </div>
            {paragraph.excerpt && (
              <div className="paragraph-excerpt">{paragraph.excerpt}</div>
            )}
            <select
              className="heading-dropdown"
              value={(answer && answer[index]) || ''}
              onChange={(e) => handleHeadingChange(index, e.target.value)}
            >
              <option value="">Select heading...</option>
              {headings && headings.map((heading, hIndex) => (
                <option key={hIndex} value={heading.value || (hIndex + 1)}>
                  {heading.value || (hIndex + 1)} - {heading.text}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingHeadings;