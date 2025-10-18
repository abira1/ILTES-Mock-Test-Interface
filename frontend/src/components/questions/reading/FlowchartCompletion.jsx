import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Flowchart Completion - Reading
 * Complete flowchart using words from the passage
 */
const FlowchartCompletion = ({ question, answer, onChange }) => {
  const title = question.payload?.title || 'Process';
  const steps = question.payload?.steps || [];
  const orientation = question.payload?.orientation || 'vertical';
  const maxWords = question.payload?.max_words || 2;
  
  const handleStepChange = (stepIndex, value) => {
    const blankSteps = steps.filter(s => s.text === '__BLANK__' || !s.text);
    if (blankSteps.length === 1) {
      onChange(value);
    } else {
      const currentAnswers = typeof answer === 'object' && answer !== null ? answer : {};
      onChange({
        ...currentAnswers,
        [stepIndex]: value
      });
    }
  };
  
  const getStepValue = (stepIndex) => {
    const blankSteps = steps.filter(s => s.text === '__BLANK__' || !s.text);
    if (blankSteps.length === 1) {
      return answer || '';
    }
    return (typeof answer === 'object' && answer !== null ? answer[stepIndex] : '') || '';
  };
  
  const renderStep = (step, idx) => {
    const isBlank = step.text === '__BLANK__' || !step.text;
    const isLast = idx === steps.length - 1;
    
    return (
      <React.Fragment key={idx}>
        <div className={`flowchart-step ${
          isBlank ? 'bg-yellow-50 border-yellow-400' : 'bg-blue-50 border-blue-300'
        } border-2 rounded-lg p-4 min-w-[200px]`}>
          {isBlank ? (
            <input
              type="text"
              value={getStepValue(idx)}
              onChange={(e) => handleStepChange(idx, e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="Complete this step"
            />
          ) : (
            <p className="text-center text-gray-800 font-medium">{step.text}</p>
          )}
        </div>
        
        {!isLast && (
          <div className={`flowchart-arrow ${
            orientation === 'horizontal' ? 'mx-2' : 'my-2'
          }`}>
            {orientation === 'horizontal' ? (
              <span className="text-2xl text-gray-400">→</span>
            ) : (
              <span className="text-2xl text-gray-400">↓</span>
            )}
          </div>
        )}
      </React.Fragment>
    );
  };
  
  return (
    <QuestionBase questionNumber={question.index} questionType="flowchart-completion">
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
            {question.index}.
          </span>
          <h4 className="font-semibold text-gray-800 text-lg">{title}</h4>
        </div>
        
        <div className="ml-12">
          <div className={`flex ${
            orientation === 'horizontal' 
              ? 'flex-row items-center overflow-x-auto' 
              : 'flex-col items-start'
          }`}>
            {steps.map((step, idx) => renderStep(step, idx))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Use NO MORE THAN {maxWords} {maxWords === 1 ? 'WORD' : 'WORDS'} from the passage
          </p>
        </div>
      </div>
    </QuestionBase>
  );
};

export default FlowchartCompletion;