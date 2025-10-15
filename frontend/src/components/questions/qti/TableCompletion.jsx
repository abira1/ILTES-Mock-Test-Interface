import React from 'react';
import { QTIListeningBase } from './QTIListeningBase';

/**
 * QTI-compliant Table Completion component
 * Based on /app/Question type/Listening/Table Completion/
 */
export class TableCompletion extends QTIListeningBase {
  render() {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div 
        className={this.getQTIClasses('qti-table-completion')}
        onClick={this.handleQuestionClick}
        data-question-index={question.index}
      >
        {/* Question Type Header */}
        <div className="qti-rubric">
          <strong>Table Completion</strong>
        </div>
        
        {/* Instructions */}
        <div className="qti-instructions">
          <p>
            <strong>Questions {payload.question_range || question.index}</strong><br/>
            Complete the table below. Write <strong>NO MORE THAN {payload.max_words || 'TWO'} WORDS AND/OR A NUMBER</strong> for each answer.
          </p>
        </div>

        {/* Table Content */}
        <div className="qti-question-content">
          <div className="qti-table-container">
            {/* Table Title */}
            {payload.table_title && (
              <h4 className="qti-table-title">{payload.table_title}</h4>
            )}
            
            {/* Table */}
            <table className="qti-table">
              {/* Headers */}
              {payload.headers && (
                <thead>
                  <tr>
                    {payload.headers.map((header, idx) => (
                      <th key={idx}>{header}</th>
                    ))}
                  </tr>
                </thead>
              )}
              
              {/* Rows */}
              <tbody>
                {payload.rows && payload.rows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.cells.map((cell, cellIdx) => (
                      <td key={cellIdx} className={cell.isBlank ? 'qti-table-blank' : ''}>
                        {cell.isBlank ? (
                          <div className="qti-table-input-container">
                            <span className="qti-question-number">{cell.question_number}</span>
                            <input
                              type="text"
                              className="qti-text-input"
                              value={this.getCellAnswer(cell.question_number)}
                              onChange={(e) => this.handleCellChange(cell.question_number, e.target.value)}
                              onFocus={() => this.handleCellFocus(cell.question_number)}
                              onBlur={this.handleBlur}
                              placeholder=""
                              size="15"
                            />
                          </div>
                        ) : (
                          <span className="qti-table-content">{cell.content}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Get answer for specific cell
   */
  getCellAnswer = (questionNumber) => {
    return this.props.answers[questionNumber] || '';
  };

  /**
   * Handle cell value changes
   */
  handleCellChange = (questionNumber, value) => {
    if (this.props.onAnswerChange) {
      this.props.onAnswerChange(questionNumber, value);
    }
  };

  /**
   * Handle cell focus for navigation
   */
  handleCellFocus = (questionNumber) => {
    if (this.props.onQuestionFocus) {
      this.props.onQuestionFocus(questionNumber);
    }
  };
}

export default TableCompletion;