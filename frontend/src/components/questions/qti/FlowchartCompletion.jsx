import React from 'react';
import { QTIListeningBase } from './QTIListeningBase';

/**
 * QTI-compliant Flowchart Completion component
 * Based on /app/Question type/Listening/Flow-chart Completion/
 */
export class FlowchartCompletion extends QTIListeningBase {
  render() {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div 
        className={this.getQTIClasses('qti-flowchart-completion')}
        onClick={this.handleQuestionClick}
        data-question-index={question.index}
      >
        {/* Question Type Header */}
        <div className="qti-rubric">
          <strong>Flow-chart Completion</strong>
        </div>
        
        {/* Instructions */}
        <div className="qti-instructions">
          <p>
            <strong>Questions {payload.question_range || question.index}</strong><br/>
            Complete the flowchart below. Write <strong>NO MORE THAN {payload.max_words || 'TWO'} WORDS</strong> for each answer.
          </p>
        </div>

        {/* Flowchart Content */}
        <div className="qti-question-content">
          <div className="qti-flowchart-container">
            {/* Flowchart Title */}
            {payload.title && (
              <h4 className="qti-flowchart-title">{payload.title}</h4>
            )}
            
            {/* Flowchart Steps */}
            <div className="qti-flowchart">
              {payload.steps && payload.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  {/* Step Box */}
                  <div className="qti-flowchart-step">
                    {step.isBlank ? (
                      <div className="qti-flowchart-blank">
                        <span className="qti-question-number">{step.question_number}</span>
                        <input
                          type="text"
                          className="qti-text-input qti-flowchart-input"
                          value={this.getStepAnswer(step.question_number)}
                          onChange={(e) => this.handleStepChange(step.question_number, e.target.value)}
                          onFocus={() => this.handleStepFocus(step.question_number)}
                          onBlur={this.handleBlur}
                          placeholder=""
                          size="15"
                        />
                      </div>
                    ) : (
                      <span className="qti-flowchart-text">{step.text}</span>
                    )}
                  </div>
                  
                  {/* Arrow (except for last step) */}
                  {idx < payload.steps.length - 1 && (
                    <div className="qti-flowchart-arrow"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Alternative: Horizontal Flowchart */}
            {payload.layout === 'horizontal' && (
              <div className="qti-flowchart qti-flowchart-horizontal">
                {payload.steps && payload.steps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    {/* Step Box */}
                    <div className="qti-flowchart-step qti-flowchart-step-horizontal">
                      {step.isBlank ? (
                        <div className="qti-flowchart-blank">
                          <span className="qti-question-number">{step.question_number}</span>
                          <input
                            type="text"
                            className="qti-text-input qti-flowchart-input"
                            value={this.getStepAnswer(step.question_number)}
                            onChange={(e) => this.handleStepChange(step.question_number, e.target.value)}
                            onFocus={() => this.handleStepFocus(step.question_number)}
                            placeholder=""
                            size="12"
                          />
                        </div>
                      ) : (
                        <span className="qti-flowchart-text">{step.text}</span>
                      )}
                    </div>
                    
                    {/* Right Arrow (except for last step) */}
                    {idx < payload.steps.length - 1 && (
                      <div className="qti-flowchart-arrow-right">→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Get answer for specific step
   */
  getStepAnswer = (questionNumber) => {
    return this.props.answers[questionNumber] || '';
  };

  /**
   * Handle step value changes
   */
  handleStepChange = (questionNumber, value) => {
    if (this.props.onAnswerChange) {
      this.props.onAnswerChange(questionNumber, value);
    }
  };

  /**
   * Handle step focus for navigation
   */
  handleStepFocus = (questionNumber) => {
    if (this.props.onQuestionFocus) {
      this.props.onQuestionFocus(questionNumber);
    }
  };
}

export default FlowchartCompletion;