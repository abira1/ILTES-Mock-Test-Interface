import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * True/False/Not Given - Reading
 * Identify if statements are True, False, or Not Given
 */
const TrueFalseNotGiven = ({ question, answer, onChange }) => {
  const prompt = question.payload?.prompt || question.prompt || '';
  const options = ['TRUE', 'FALSE', 'NOT GIVEN'];
  
  return (
    <QuestionBase questionNumber={question.index} questionType="true-false-not-given">
      <div className="flex items-start gap-3 mb-4">
        <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
          {question.index}.
        </span>
        <div className="flex-1">
          <p className="text-gray-800 mb-3 leading-relaxed">{prompt}</p>
          <div className="flex gap-3 flex-wrap">
            {options.map((option) => {
              const isSelected = answer === option;
              
              return (
                <button
                  key={option}
                  onClick={() => onChange(option)}
                  className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </QuestionBase>
  );
};

export default TrueFalseNotGiven;