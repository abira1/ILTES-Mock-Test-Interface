import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Fill in the Gaps - Listening
 * Complete form or table with missing information
 */
const FillInGaps = ({ question, answer, onChange }) => {
  const fields = question.payload?.fields || [];
  const title = question.payload?.title || question.payload?.form_title || 'Complete the form';
  
  // Handle multiple fields (for form/table completion)
  const handleFieldChange = (fieldIndex, value) => {
    // If single field, just update the answer
    if (fields.length === 1) {
      onChange(value);
    } else {
      // Multiple fields - store as object
      const currentAnswers = typeof answer === 'object' && answer !== null ? answer : {};
      onChange({
        ...currentAnswers,
        [fieldIndex]: value
      });
    }
  };
  
  const getFieldValue = (fieldIndex) => {
    if (fields.length === 1) {
      return answer || '';
    }
    return (typeof answer === 'object' && answer !== null ? answer[fieldIndex] : '') || '';
  };
  
  return (
    <QuestionBase questionNumber={question.index} questionType="fill-in-gaps">
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
            {question.index}.
          </span>
          <h4 className="font-semibold text-gray-800 text-lg">{title}</h4>
        </div>
        
        <div className="ml-12 space-y-3">
          {fields.map((field, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <label className="font-medium text-gray-700 min-w-[120px]">
                {field.label || `Field ${idx + 1}:`}
              </label>
              <input
                type="text"
                value={getFieldValue(idx)}
                onChange={(e) => handleFieldChange(idx, e.target.value)}
                className="flex-1 max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Your answer"
              />
            </div>
          ))}
        </div>
      </div>
    </QuestionBase>
  );
};

export default FillInGaps;