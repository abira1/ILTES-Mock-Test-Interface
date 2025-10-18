import React from 'react';

/**
 * Base component for all QTI question types
 * Provides common structure and styling
 */
const QuestionBase = ({ 
  questionNumber, 
  children, 
  className = '',
  questionType = 'default'
}) => {
  return (
    <div className={`qti-question-wrapper mb-6 ${className}`} data-question-type={questionType}>
      <div className="qti-question-content">
        {children}
      </div>
    </div>
  );
};

export default QuestionBase;
