import React from 'react';
import { QTIListeningBase } from './QTIListeningBase';

/**
 * QTI-compliant Form Completion component
 * Based on /app/Question type/Listening/Form Completion/
 */
export class FormCompletion extends QTIListeningBase {
  render() {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div 
        className={this.getQTIClasses('qti-form-completion')}
        onClick={this.handleQuestionClick}
        data-question-index={question.index}
      >
        {/* Question Type Header */}
        <div className="qti-rubric">
          <strong>Form Completion</strong>
        </div>
        
        {/* Instructions */}
        <div className="qti-instructions">
          <p>
            <strong>Questions {payload.question_range || question.index}</strong><br/>
            Complete the form. Write <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong> in each gap.
          </p>
        </div>

        {/* Form Content */}
        <div className="qti-question-content">
          <div className="qti-form-container">
            {/* Form Title */}
            <h4 className="qti-form-title">{payload.form_title}</h4>
            
            {/* Form Fields */}
            <div className="qti-form-fields">
              {payload.fields && payload.fields.map((field, idx) => (
                <div key={idx} className="qti-form-field">
                  <span className="qti-form-label">{field.label}</span>
                  {field.isBlank ? (
                    <span className="qti-text-input-container">
                      <span className="qti-question-number">{field.question_number}</span>
                      <input
                        type="text"
                        className="qti-text-input expandable"
                        value={this.getFieldAnswer(field.question_number)}
                        onChange={(e) => this.handleFieldChange(field.question_number, e.target.value)}
                        onFocus={() => this.handleFieldFocus(field.question_number)}
                        onBlur={this.handleBlur}
                        size="15"
                        placeholder=""
                      />
                    </span>
                  ) : (
                    <span className="qti-form-value">{field.content}</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* SVG Diagram if present */}
            {payload.diagram_svg && (
              <div className="qti-diagram-container">
                <div className="qti-svg-container" dangerouslySetInnerHTML={{ __html: payload.diagram_svg }} />
                
                {/* Overlay inputs for diagram */}
                {payload.diagram_fields && payload.diagram_fields.map((field, idx) => (
                  <div key={idx} className="qti-overlay-field" style={field.position}>
                    {field.isBlank ? (
                      <span className="qti-text-input-container">
                        <span className="qti-question-number">{field.question_number}</span>
                        <input
                          type="text"
                          className="qti-text-input"
                          value={this.getFieldAnswer(field.question_number)}
                          onChange={(e) => this.handleFieldChange(field.question_number, e.target.value)}
                          onFocus={() => this.handleFieldFocus(field.question_number)}
                          size="10"
                        />
                      </span>
                    ) : (
                      <span>{field.content}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Get answer for specific field
   */
  getFieldAnswer = (questionNumber) => {
    return this.props.answers[questionNumber] || '';
  };

  /**
   * Handle field value changes
   */
  handleFieldChange = (questionNumber, value) => {
    if (this.props.onAnswerChange) {
      this.props.onAnswerChange(questionNumber, value);
    }
  };

  /**
   * Handle field focus for navigation
   */
  handleFieldFocus = (questionNumber) => {
    if (this.props.onQuestionFocus) {
      this.props.onQuestionFocus(questionNumber);
    }
  };
}

export default FormCompletion;