import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Multiple Choice (One Answer) - Reading
 * Choose ONE correct answer
 */
const MultipleChoiceSingle = ({ question, answer, onChange }) => {
  const options = question.payload?.options || [];
  const prompt = question.payload?.prompt || question.prompt || '';
  
  return (
    <QuestionBase questionNumber={question.index} questionType="multiple-choice-single">
      <div className="flex items-start gap-3 mb-4">
        <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
          {question.index}.
        </span>
        <div className="flex-1">
          <p className="text-gray-800 mb-3 leading-relaxed">{prompt}</p>
          <ul className="space-y-2">
            {options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = answer === letter;
              
              return (
                <li key={letter}>
                  <label className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name={`question-${question.index}`}
                      value={letter}
                      checked={isSelected}
                      onChange={(e) => onChange(e.target.value)}
                      className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
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
        </div>
      </div>
    </QuestionBase>
  );
};

export default MultipleChoiceSingle;