import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Summary Completion (from List) - Reading
 * Complete summary by selecting from a word list
 */
const SummaryCompletionList = ({ question, answer, onChange }) => {
  const summary = question.payload?.summary || '';
  const wordList = question.payload?.word_list || [];
  const blanks = question.payload?.blanks || [];
  
  const handleBlankChange = (blankIndex, value) => {
    if (blanks.length === 1) {
      onChange(value);
    } else {
      const currentAnswers = typeof answer === 'object' && answer !== null ? answer : {};
      onChange({
        ...currentAnswers,
        [blankIndex]: value
      });
    }
  };
  
  const getBlankValue = (blankIndex) => {
    if (blanks.length === 1) {
      return answer || '';
    }
    return (typeof answer === 'object' && answer !== null ? answer[blankIndex] : '') || '';
  };
  
  return (
    <QuestionBase questionNumber={question.index} questionType="summary-completion-list">
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
            {question.index}.
          </span>
          <h4 className="font-semibold text-gray-800">Complete the summary</h4>
        </div>
        
        <div className="ml-12">
          <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h5 className="font-semibold text-gray-700 mb-2">Word List:</h5>
            <div className="flex flex-wrap gap-2">
              {wordList.map((word, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border border-green-300 rounded text-sm font-medium text-gray-700">
                  {word}
                </span>
              ))}
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-800 mb-4 leading-relaxed">{summary}</p>
            
            <div className="space-y-3">
              {blanks.map((blank, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <label className="font-medium text-gray-700">
                    {blank.index || question.index + idx}.
                  </label>
                  <select
                    value={getBlankValue(idx)}
                    onChange={(e) => handleBlankChange(idx, e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                  >
                    <option value="">-- Select word --</option>
                    {wordList.map((word) => (
                      <option key={word} value={word}>
                        {word}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </QuestionBase>
  );
};

export default SummaryCompletionList;