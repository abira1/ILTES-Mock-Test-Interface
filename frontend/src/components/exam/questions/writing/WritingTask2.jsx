import React, { useState } from 'react';

const WritingTask2 = ({ question, answer, onAnswerChange }) => {
  const { prompt, context, minWords } = question.payload || {};
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e) => {
    const text = e.target.value;
    onAnswerChange(text);
    
    // Count words
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  React.useEffect(() => {
    if (answer) {
      const words = answer.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    }
  }, []);

  const minWordCount = minWords || 250;
  const isWordCountSufficient = wordCount >= minWordCount;

  return (
    <div className="writing-task-2-question">
      {context && (
        <div className="task-context">
          {context}
        </div>
      )}

      <div className="task-instructions">
        <p><strong>You should spend about 40 minutes on this task.</strong></p>
        <p>Write about the following topic:</p>
      </div>

      {prompt && (
        <div className="task-prompt">
          <div className="prompt-box">
            {prompt}
          </div>
        </div>
      )}

      <div className="task-requirements">
        <p>Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
      </div>

      <div className="word-count-info">
        <span className={`word-count ${isWordCountSufficient ? 'sufficient' : 'insufficient'}`}>
          {wordCount} words
        </span>
        <span className="min-words">(Minimum: {minWordCount} words)</span>
      </div>

      <textarea
        className="writing-textarea"
        value={answer || ''}
        onChange={handleTextChange}
        placeholder="Write your essay here..."
        rows={25}
      />
    </div>
  );
};

export default WritingTask2;