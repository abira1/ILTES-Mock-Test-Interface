import React from 'react';
import { QTIListeningBase } from './QTIListeningBase';

/**
 * QTI-compliant Sentence Completion component
 * Based on /app/Question type/Listening/Sentence Completion/
 */
export class SentenceCompletion extends QTIListeningBase {
  render() {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div 
        className={this.getQTIClasses('qti-sentence-completion')}
        onClick={this.handleQuestionClick}
        data-question-index={question.index}
      >
        {/* Question Type Header */}
        <div className="qti-rubric">
          <strong>Sentence Completion</strong>
        </div>
        
        {/* Instructions */}
        <div className="qti-instructions">
          <p>
            <strong>Questions {payload.question_range || question.index}</strong><br/>
            Complete the sentences below. Write <strong>NO MORE THAN {payload.max_words || 'TWO'} WORDS</strong> for each answer.
          </p>
        </div>

        {/* Question Content */}
        <div className="qti-question-content">
          {payload.sentences ? this.renderMultipleSentences() : this.renderSingleSentence()}
        </div>
      </div>
    );
  }

  /**
   * Render single sentence with blank
   */
  renderSingleSentence = () => {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div className="flex items-start gap-2">
        {this.renderQuestionNumber()}
        <div className="flex-1">
          <div className="qti-sentence-text">
            {this.renderSentenceWithBlank(payload.prompt)}
          </div>
          {payload.max_words && (
            <div className="qti-word-limit">
              <small className="text-gray-600">Maximum {payload.max_words} words</small>
            </div>
          )}
        </div>
      </div>
    );
  };

  /**
   * Render multiple sentences (for grouped sentence completion)
   */
  renderMultipleSentences = () => {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div className="qti-sentences-container">
        {payload.sentences.map((sentence, idx) => (
          <div key={idx} className="qti-sentence-item mb-3">
            <div className="flex items-start gap-2">
              <span className="qti-question-number">{sentence.question_number}</span>
              <div className="flex-1">
                <div className="qti-sentence-text">
                  {this.renderSentenceWithBlank(sentence.text, sentence.question_number)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /**
   * Render sentence text with inline input for blank
   */
  renderSentenceWithBlank = (sentenceText, questionNumber = null) => {
    if (!sentenceText) return null;
    
    // Split by blank markers (_____, __BLANK__, etc.)
    const parts = sentenceText.split(/(__+[A-Z]*__+|_+)/g);
    const qNum = questionNumber || this.props.question.index;
    
    return (
      <div className="qti-sentence-with-blank">
        {parts.map((part, idx) => {
          // Check if this part is a blank
          if (part.match(/^__+[A-Z]*__+$|^_+$/)) {
            return (
              <span key={idx} className="qti-inline-blank">
                <input
                  type="text"
                  className="qti-text-input"
                  value={questionNumber ? this.props.answers[questionNumber] || '' : this.getCurrentAnswer()}
                  onChange={(e) => this.handleAnswerChangeForQuestion(qNum, e.target.value)}
                  onFocus={() => this.handleFocusForQuestion(qNum)}
                  onBlur={this.handleBlur}
                  placeholder=""
                  size="15"
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

  /**
   * Handle answer change for specific question number
   */
  handleAnswerChangeForQuestion = (questionNumber, value) => {
    if (this.props.onAnswerChange) {
      this.props.onAnswerChange(questionNumber, value);
    }
  };

  /**
   * Handle focus for specific question number
   */
  handleFocusForQuestion = (questionNumber) => {
    if (this.props.onQuestionFocus) {
      this.props.onQuestionFocus(questionNumber);
    }
  };
}

export default SentenceCompletion;