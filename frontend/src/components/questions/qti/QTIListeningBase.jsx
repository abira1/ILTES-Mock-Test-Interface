import React from 'react';

/**
 * Base component for QTI-compliant listening question types
 * Provides common functionality and styling for all listening questions
 */
export class QTIListeningBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    };
  }

  /**
   * Handle focus events for question tracking
   */
  handleFocus = () => {
    this.setState({ isFocused: true });
    if (this.props.onQuestionFocus) {
      this.props.onQuestionFocus(this.props.question.index);
    }
  };

  /**
   * Handle blur events
   */
  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  /**
   * Handle answer changes with proper event handling
   */
  handleAnswerChange = (value) => {
    if (this.props.onAnswerChange) {
      this.props.onAnswerChange(this.props.question.index, value);
    }
  };

  /**
   * Get current answer value
   */
  getCurrentAnswer = () => {
    return this.props.answers[this.props.question.index] || '';
  };

  /**
   * Check if this question is currently selected
   */
  isCurrentQuestion = () => {
    return this.props.currentQuestionIndex === this.props.question.index;
  };

  /**
   * Get QTI-compliant CSS classes
   */
  getQTIClasses = (baseClasses = '') => {
    const classes = [
      'qti-item-container',
      baseClasses,
      this.isCurrentQuestion() ? 'qti-current' : '',
      this.state.isFocused ? 'qti-focused' : ''
    ];
    return classes.filter(Boolean).join(' ');
  };

  /**
   * Render question number with QTI styling
   */
  renderQuestionNumber = () => {
    return (
      <span className="qti-question-number">
        {this.props.question.index}
      </span>
    );
  };

  /**
   * Common click handler for question selection
   */
  handleQuestionClick = () => {
    if (this.props.onQuestionClick) {
      this.props.onQuestionClick(this.props.question.index);
    }
  };

  render() {
    // Override in child components
    return null;
  }
}

export default QTIListeningBase;