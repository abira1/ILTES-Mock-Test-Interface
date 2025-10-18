import React from 'react';

const FlowchartCompletion = ({ question, answer, onAnswerChange }) => {
  const { flowchart, steps, context, orientation } = question.payload || {};

  const handleInputChange = (index, value) => {
    const newAnswer = Array.isArray(answer) ? [...answer] : [];
    newAnswer[index] = value;
    onAnswerChange(newAnswer);
  };

  const renderFlowchartStep = (step, index) => {
    if (step.type === 'input') {
      return (
        <div key={index} className="flowchart-step input-step">
          <div className="step-label">{step.label}</div>
          <input
            type="text"
            className="flowchart-input"
            value={(answer && answer[step.index || index]) || ''}
            onChange={(e) => handleInputChange(step.index || index, e.target.value)}
            maxLength={step.maxLength || 20}
            autoComplete="off"
            placeholder={`${step.questionNumber || (question.index + index)}`}
          />
        </div>
      );
    } else {
      return (
        <div key={index} className="flowchart-step label-step">
          {step.content || step.text}
        </div>
      );
    }
  };

  return (
    <div className="flowchart-completion-question">
      {context && (
        <div className="question-context">
          {context}
        </div>
      )}

      {flowchart?.image && (
        <div className="flowchart-image-container">
          <img 
            src={flowchart.image} 
            alt="Flowchart" 
            className="flowchart-image"
          />
        </div>
      )}

      <div className={`flowchart-container ${orientation === 'horizontal' ? 'horizontal' : 'vertical'}`}>
        {steps && steps.map((step, index) => (
          <React.Fragment key={index}>
            {renderFlowchartStep(step, index)}
            {index < steps.length - 1 && (
              <div className="flowchart-arrow">
                {orientation === 'horizontal' ? '→' : '↓'}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FlowchartCompletion;