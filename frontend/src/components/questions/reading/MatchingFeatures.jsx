import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Matching Features - Reading
 * Match features to statements or categories
 */
const MatchingFeatures = ({ question, answer, onChange }) => {
  const instructions = question.payload?.instructions || 'Match the features';
  const statements = question.payload?.statements || [];
  const features = question.payload?.features || [];
  
  const handleMatch = (statementId, featureKey) => {
    if (statements.length === 1) {
      onChange(featureKey);
    } else {
      const currentMatches = typeof answer === 'object' && answer !== null ? answer : {};
      onChange({
        ...currentMatches,
        [statementId]: featureKey
      });
    }
  };
  
  const getMatch = (statementId) => {
    if (statements.length === 1) {
      return answer || '';
    }
    return (typeof answer === 'object' && answer !== null ? answer[statementId] : '') || '';
  };
  
  return (
    <QuestionBase questionNumber={question.index} questionType="matching-features">
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
            {question.index}.
          </span>
          <p className="text-gray-800 font-medium">{instructions}</p>
        </div>
        
        <div className="ml-12">
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-gray-700 mb-2">Features:</h5>
            <div className="space-y-1">
              {features.map((feature) => (
                <div key={feature.key} className="text-sm">
                  <span className="font-semibold text-blue-700">{feature.key}.</span>
                  <span className="ml-2 text-gray-800">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            {statements.map((statement) => (
              <div key={statement.id} className="flex items-start gap-3">
                <span className="font-medium text-gray-700 flex-1">
                  {statement.text}
                </span>
                <select
                  value={getMatch(statement.id)}
                  onChange={(e) => handleMatch(statement.id, e.target.value)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="">--</option>
                  {features.map((feature) => (
                    <option key={feature.key} value={feature.key}>
                      {feature.key}
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

export default MatchingFeatures;