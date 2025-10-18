import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Multiple Choice (More Than One Answer) - Reading
 * Choose TWO or more correct answers
 */
const MultipleChoiceMultiple = ({ question, answer, onChange }) => {
  const options = question.payload?.options || [];
  const prompt = question.payload?.prompt || question.prompt || '';
  const selectCount = question.payload?.select_count || 2;
  
  const selectedAnswers = Array.isArray(answer) ? answer : [];
  
  const handleCheckboxChange = (letter) => {
    let newAnswers;
    if (selectedAnswers.includes(letter)) {
      newAnswers = selectedAnswers.filter(a => a !== letter);
    } else {
      if (selectedAnswers.length < selectCount) {
        newAnswers = [...selectedAnswers, letter];
      } else {
        return;
      }
    }
    onChange(newAnswers);
  };
  
  return (
    <QuestionBase questionNumber={question.index} questionType="multiple-choice-multiple">
      <div className="flex items-start gap-3 mb-4">
        <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
          {question.index}.
        </span>
        <div className="flex-1">
          <p className="text-gray-800 mb-2 leading-relaxed">{prompt}</p>
          <p className="text-sm text-blue-600 font-medium mb-3">
            Choose {selectCount === 2 ? 'TWO' : selectCount === 3 ? 'THREE' : `${selectCount}`} answers.
          </p>
          <ul className="space-y-2">
            {options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedAnswers.includes(letter);
              const isDisabled = !isSelected && selectedAnswers.length >= selectCount;
              
              return (
                <li key={letter}>
                  <label className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : isDisabled
                      ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    <input
                      type="checkbox"
                      value={letter}
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => handleCheckboxChange(letter)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-700 mr-2">{letter}.</span>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            Selected: {selectedAnswers.length}/{selectCount}
          </p>
        </div>
      </div>
    </QuestionBase>
  );
};

export default MultipleChoiceMultiple;