import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Matching - Listening
 * Match items from one list to another
 */
const Matching = ({ question, answer, onChange }) => {
  const instructions = question.payload?.instructions || 'Match the items';
  const leftItems = question.payload?.left_items || [];
  const rightItems = question.payload?.right_items || [];
  
  // For multiple matching items in one question
  const handleMatch = (leftId, rightKey) => {
    if (leftItems.length === 1) {
      // Single matching item
      onChange(rightKey);
    } else {
      // Multiple items - store as object
      const currentMatches = typeof answer === 'object' && answer !== null ? answer : {};
      onChange({
        ...currentMatches,
        [leftId]: rightKey
      });
    }
  };
  
  const getMatch = (leftId) => {
    if (leftItems.length === 1) {
      return answer || '';
    }
    return (typeof answer === 'object' && answer !== null ? answer[leftId] : '') || '';
  };
  
  return (
    <QuestionBase questionNumber={question.index} questionType="matching">
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
            {question.index}.
          </span>
          <p className="text-gray-800 font-medium">{instructions}</p>
        </div>
        
        <div className="ml-12">
          {/* Right items (options) */}
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-gray-700 mb-2">Options:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {rightItems.map((item) => (
                <div key={item.key} className="text-sm">
                  <span className="font-semibold text-blue-700">{item.key}.</span>
                  <span className="ml-2 text-gray-800">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Left items (to match) */}
          <div className="space-y-3">
            {leftItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="font-medium text-gray-700 min-w-[200px]">
                  {item.text}
                </span>
                <select
                  value={getMatch(item.id)}
                  onChange={(e) => handleMatch(item.id, e.target.value)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="">-- Select --</option>
                  {rightItems.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.key}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </QuestionBase>
  );
};

export default Matching;