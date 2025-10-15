import React, { useState } from 'react';
import { QTIListeningBase } from './QTIListeningBase';

/**
 * QTI-compliant Matching component
 * Based on /app/Question type/Listening/Matching/
 */
export class Matching extends QTIListeningBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      selectedLeft: null,
      selectedRight: null
    };
  }

  render() {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div 
        className={this.getQTIClasses('qti-matching')}
        onClick={this.handleQuestionClick}
        data-question-index={question.index}
      >
        {/* Question Type Header */}
        <div className="qti-rubric">
          <strong>Matching</strong>
        </div>
        
        {/* Instructions */}
        <div className="qti-instructions">
          <p>
            <strong>Questions {payload.question_range || question.index}</strong><br/>
            {payload.instructions || 'Match each item from the list on the left with the correct option from the list on the right.'}
          </p>
        </div>

        {/* Matching Interface */}
        <div className="qti-question-content">
          <div className="qti-matching-container">
            {/* Left Items */}
            <div className="qti-matching-list qti-left-items">
              <h5 className="qti-matching-title">{payload.left_title || 'Items to Match'}</h5>
              {payload.left_items && payload.left_items.map((item, idx) => (
                <div 
                  key={idx}
                  className={`qti-matching-item ${this.state.selectedLeft === item.id ? 'selected' : ''}`}
                  onClick={() => this.handleLeftItemClick(item.id)}
                >
                  <span className="qti-question-number">{item.question_number || (idx + 1)}</span>
                  <span className="qti-item-text">{item.text}</span>
                  {/* Show current match */}
                  {this.getCurrentMatch(item.id) && (
                    <span className="qti-current-match">
                      → {this.getCurrentMatch(item.id)}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Right Options */}
            <div className="qti-matching-list qti-right-items">
              <h5 className="qti-matching-title">{payload.right_title || 'Options'}</h5>
              {payload.right_items && payload.right_items.map((item, idx) => (
                <div 
                  key={idx}
                  className={`qti-matching-item ${this.state.selectedRight === item.key ? 'selected' : ''} ${this.isRightItemUsed(item.key) ? 'used' : ''}`}
                  onClick={() => this.handleRightItemClick(item.key, item.text)}
                >
                  <span className="qti-option-key">{item.key}</span>
                  <span className="qti-item-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Matches Display */}
          <div className="qti-matches-display">
            <h6>Current Matches:</h6>
            <div className="qti-matches-list">
              {this.getCurrentMatches().map((match, idx) => (
                <div key={idx} className="qti-match-item">
                  <span className="qti-match-question">{match.questionNumber}</span>
                  <span className="qti-match-arrow">→</span>
                  <span className="qti-match-answer">{match.answer}</span>
                  <button 
                    className="qti-match-remove"
                    onClick={() => this.removeMatch(match.questionNumber)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Handle left item selection
   */
  handleLeftItemClick = (itemId) => {
    this.setState({ selectedLeft: itemId, selectedRight: null });
  };

  /**
   * Handle right item selection and create match
   */
  handleRightItemClick = (itemKey, itemText) => {
    if (this.state.selectedLeft) {
      // Find the question number for the selected left item
      const { question } = this.props;
      const leftItem = question.payload.left_items.find(item => item.id === this.state.selectedLeft);
      if (leftItem) {
        const questionNumber = leftItem.question_number;
        this.handleAnswerChange(questionNumber, itemKey);
      }
      this.setState({ selectedLeft: null, selectedRight: null });
    } else {
      this.setState({ selectedRight: itemKey });
    }
  };

  /**
   * Handle individual answer change for matching
   */
  handleAnswerChange = (questionNumber, value) => {
    if (this.props.onAnswerChange) {
      this.props.onAnswerChange(questionNumber, value);
    }
  };

  /**
   * Get current match for a left item
   */
  getCurrentMatch = (itemId) => {
    const { question, answers } = this.props;
    const leftItem = question.payload.left_items.find(item => item.id === itemId);
    if (leftItem && leftItem.question_number) {
      return answers[leftItem.question_number] || null;
    }
    return null;
  };

  /**
   * Check if right item is already used
   */
  isRightItemUsed = (itemKey) => {
    const { answers } = this.props;
    return Object.values(answers).includes(itemKey);
  };

  /**
   * Get all current matches
   */
  getCurrentMatches = () => {
    const { question, answers } = this.props;
    const matches = [];
    
    if (question.payload.left_items) {
      question.payload.left_items.forEach(leftItem => {
        if (leftItem.question_number && answers[leftItem.question_number]) {
          matches.push({
            questionNumber: leftItem.question_number,
            leftText: leftItem.text,
            answer: answers[leftItem.question_number]
          });
        }
      });
    }
    
    return matches;
  };

  /**
   * Remove a match
   */
  removeMatch = (questionNumber) => {
    this.handleAnswerChange(questionNumber, '');
  };
}

export default Matching;