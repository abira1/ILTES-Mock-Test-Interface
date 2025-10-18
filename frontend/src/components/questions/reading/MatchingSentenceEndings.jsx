import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Matching Sentence Endings - Reading
 * Match sentence beginnings to correct endings
 */
const MatchingSentenceEndings = ({ question, answer, onChange }) => {
  const sentenceBeginning = question.payload?.sentence_beginning || '';
  const endings = question.payload?.endings || [];
  
  return (
    <QuestionBase questionNumber={question.index} questionType="matching-sentence-endings">
      <div className="flex items-start gap-3 mb-4">
        <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
          {question.index}.
        </span>
        <div className="flex-1">
          <p className="text-gray-800 mb-3 font-medium">{sentenceBeginning}</p>
          
          <div className="space-y-2">
            {endings.map((ending) => {
              const isSelected = answer === ending.key;
              
              return (
                <label
                  key={ending.key}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.index}`}
                    value={ending.key}
                    checked={isSelected}
                    onChange={(e) => onChange(e.target.value)}
                    className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-gray-700 mr-2">{ending.key}.</span>
                    <span className="text-gray-800">{ending.text}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </QuestionBase>
  );
};

export default MatchingSentenceEndings;