import React from 'react';
import { QTIListeningBase } from './QTIListeningBase';

/**
 * QTI-compliant Multiple Choice (Single Answer) component
 * Based on /app/Question type/Listening/Multiple Choice (one answer)/
 */
export class MultipleChoiceSingle extends QTIListeningBase {
  render() {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div 
        className={this.getQTIClasses('qti-multiple-choice-single')}
        onClick={this.handleQuestionClick}
        data-question-index={question.index}
      >
        {/* Question Type Header */}
        <div className="qti-rubric">
          <strong>Multiple Choice (one answer)</strong>
        </div>
        
        {/* Instructions */}
        <div className="qti-instructions">
          <p>
            <strong>Question {question.index}</strong><br/>
            Choose the correct answer.
          </p>
        </div>

        {/* Question Content */}
        <div className="qti-question-content">
          <div className="flex items-start gap-2">
            {this.renderQuestionNumber()}
            <div className="flex-1">
              {/* Question Prompt */}
              <p className="qti-prompt mb-3">{payload.prompt}</p>
              
              {/* Multiple Choice Options */}
              <ul className="qti-choice-list">
                {payload.options.map((option, idx) => {
                  const optionKey = String.fromCharCode(65 + idx); // A, B, C, D
                  const isSelected = this.getCurrentAnswer() === optionKey;
                  
                  return (
                    <li key={idx} className={`qti-choice-item ${isSelected ? 'selected' : ''}`}>
                      <label className="flex items-start gap-2 cursor-pointer p-2">
                        <input
                          type="radio"
                          name={`question_${question.index}`}
                          value={optionKey}
                          checked={isSelected}
                          onChange={(e) => this.handleAnswerChange(e.target.value)}
                          onFocus={this.handleFocus}
                          className="mt-1"
                        />
                        <span className="text-gray-700">
                          <strong>{optionKey}.</strong> {option}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MultipleChoiceSingle;