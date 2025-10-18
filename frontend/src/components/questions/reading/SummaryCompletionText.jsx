import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Summary Completion (from Text) - Reading
 * Complete summary using words from the passage
 */
const SummaryCompletionText = ({ question, answer, onChange }) => {
  const summary = question.payload?.summary || '';
  const blanks = question.payload?.blanks || [];
  const maxWords = question.payload?.max_words || 2;
  
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
    <QuestionBase questionNumber={question.index} questionType="summary-completion-text">
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
            {question.index}.
          </span>
          <h4 className="font-semibold text-gray-800">Complete the summary</h4>
        </div>
        
        <div className="ml-12">
          <div className="prose max-w-none mb-4">
            <p className="text-gray-800 leading-relaxed">{summary}</p>
          </div>
          
          <div className="space-y-3">
            {blanks.map((blank, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <label className="font-medium text-gray-700 min-w-[80px]">
                  {blank.index || question.index + idx}.
                </label>
                <input
                  type="text"
                  value={getBlankValue(idx)}
                  onChange={(e) => handleBlankChange(idx, e.target.value)}
                  className="flex-1 max-w-sm px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Your answer"
                />
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Use NO MORE THAN {maxWords} {maxWords === 1 ? 'WORD' : 'WORDS'} from the passage
          </p>
        </div>
      </div>
    </QuestionBase>
  );
};

export default SummaryCompletionText;