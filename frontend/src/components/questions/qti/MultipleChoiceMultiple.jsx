import React from 'react';
import { QTIListeningBase } from './QTIListeningBase';

/**
 * QTI-compliant Multiple Choice (Multiple Answers) component
 * Based on /app/Question type/Listening/Multiple Choice (more than one answer)/
 */
export class MultipleChoiceMultiple extends QTIListeningBase {
  render() {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div 
        className={this.getQTIClasses('qti-multiple-choice-multiple')}
        onClick={this.handleQuestionClick}
        data-question-index={question.index}
      >
        {/* Question Type Header */}
        <div className="qti-rubric">
          <strong>Multiple Choice (more than one answer)</strong>
        </div>
        
        {/* Instructions */}
        <div className="qti-instructions">
          <p>
            <strong>Questions {payload.question_range || question.index}</strong><br/>
            Choose <strong>{this.getSelectCountText()}</strong> answers.
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
                  const currentAnswers = this.getCurrentAnswersArray();
                  const isSelected = currentAnswers.includes(optionKey);
                  
                  return (
                    <li key={idx} className={`qti-choice-item ${isSelected ? 'selected' : ''}`}>
                      <label className="flex items-start gap-2 cursor-pointer p-2">
                        <input
                          type="checkbox"
                          value={optionKey}
                          checked={isSelected}
                          onChange={(e) => this.handleCheckboxChange(e.target.value, e.target.checked)}
                          onFocus={this.handleFocus}
                          className="mt-1"
                          disabled={this.isSelectionLimitReached() && !isSelected}
                        />
                        <span className="text-gray-700">
                          <strong>{optionKey}.</strong> {option}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              
              {/* Selection Counter */}
              <div className="qti-selection-counter mt-2">
                <small className="text-gray-600">
                  Selected: {this.getCurrentAnswersArray().length}/{payload.select_count || 2}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Get current answers as array
   */
  getCurrentAnswersArray = () => {
    const answer = this.getCurrentAnswer();
    if (!answer) return [];
    if (Array.isArray(answer)) return answer;
    return [answer];
  };

  /**
   * Handle checkbox selection changes
   */
  handleCheckboxChange = (optionKey, isChecked) => {
    const currentAnswers = this.getCurrentAnswersArray();
    let newAnswers;
    
    if (isChecked) {
      newAnswers = [...currentAnswers, optionKey];
    } else {
      newAnswers = currentAnswers.filter(answer => answer !== optionKey);
    }
    
    this.handleAnswerChange(newAnswers);
  };

  /**
   * Check if selection limit is reached
   */
  isSelectionLimitReached = () => {
    const { question } = this.props;
    const payload = question.payload;
    const selectCount = payload.select_count || 2;
    return this.getCurrentAnswersArray().length >= selectCount;
  };

  /**
   * Get selection count text
   */
  getSelectCountText = () => {
    const { question } = this.props;
    const payload = question.payload;
    const count = payload.select_count || 2;
    
    const countWords = {
      2: 'TWO',
      3: 'THREE', 
      4: 'FOUR',
      5: 'FIVE'
    };
    
    return countWords[count] || count.toString();
  };
}

export default MultipleChoiceMultiple;