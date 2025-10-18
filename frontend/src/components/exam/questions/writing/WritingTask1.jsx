import React, { useState } from 'react';

const WritingTask1 = ({ question, answer, onAnswerChange }) => {
  const { prompt, chartImage, minWords, context } = question.payload || {};
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

  const minWordCount = minWords || 150;
  const isWordCountSufficient = wordCount >= minWordCount;

  return (
    <div className="writing-task-1-question">
      {context && (
        <div className="task-context">
          {context}
        </div>
      )}

      <div className="task-instructions">
        <p><strong>You should spend about 20 minutes on this task.</strong></p>
      </div>

      {chartImage && (
        <div className="chart-image-container">
          <img 
            src={chartImage} 
            alt="Chart or diagram" 
            className="chart-image"
          />
        </div>
      )}

      {prompt && (
        <div className="task-prompt">
          {prompt}
        </div>
      )}

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
        placeholder="Write your response here..."
        rows={20}
      />
    </div>
  );
};

export default WritingTask1;