import React from 'react';
import { QTIListeningBase } from './QTIListeningBase';

/**
 * QTI-compliant Fill in the Gaps (Short Answers) component
 * Based on /app/Question type/Listening/Fill in the gaps short answers/
 */
export class FillInGapsShortAnswers extends QTIListeningBase {
  render() {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div 
        className={this.getQTIClasses('qti-fill-gaps-short')}
        onClick={this.handleQuestionClick}
        data-question-index={question.index}
      >
        {/* Question Number and Instructions */}
        <div className="qti-rubric">
          <strong>Fill in the Gaps (Short Answers)</strong>
        </div>
        
        {/* Instructions */}
        <div className="qti-instructions">
          <p>
            <strong>Question {question.index}</strong><br/>
            Write <strong>NO MORE THAN {payload.max_words || 'TWO'} WORDS</strong> for each answer.
          </p>
        </div>

        {/* Question Content */}
        <div className="qti-question-content">
          <div className="flex items-start gap-2">
            {this.renderQuestionNumber()}
            <div className="flex-1">
              {this.renderPromptWithBlanks(payload.prompt)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render prompt text with inline input fields for blanks
   */
  renderPromptWithBlanks = (prompt) => {
    if (!prompt) return null;
    
    // Split text by blanks (_____ or numbered blanks like __1__, __2__)
    const parts = prompt.split(/(__+\d*__+|_+)/g);
    
    return (
      <div className="qti-prompt-with-blanks">
        {parts.map((part, idx) => {
          // Check if this part is a blank
          if (part.match(/^__+\d*__+$|^_+$/)) {
            return (
              <span key={idx} className="qti-inline-blank">
                <input
                  type="text"
                  className="qti-text-input"
                  value={this.getCurrentAnswer()}
                  onChange={(e) => this.handleAnswerChange(e.target.value)}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  placeholder=""
                  size="10"
                />
              </span>
            );
          } else {
            // Regular text
            return <span key={idx}>{part}</span>;
          }
        })}
      </div>
    );
  };
}

export default FillInGapsShortAnswers;