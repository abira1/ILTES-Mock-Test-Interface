import React from 'react';
import { QTIListeningBase } from './QTIListeningBase';

/**
 * QTI-compliant Fill in the Gaps component
 * Based on /app/Question type/Listening/Fill in the gaps/
 */
export class FillInGaps extends QTIListeningBase {
  render() {
    const { question, answers } = this.props;
    const payload = question.payload;
    
    return (
      <div 
        className={this.getQTIClasses('qti-fill-gaps')}
        onClick={this.handleQuestionClick}
        data-question-index={question.index}
      >
        {/* Question Number and Instructions */}
        <div className="qti-rubric">
          <strong>Fill in the Gaps</strong>
        </div>
        
        {/* Instructions */}
        <div className="qti-instructions">
          <p>
            <strong>Questions {payload.question_range || question.index}</strong><br/>
            Complete the notes. Write <strong>ONE WORD AND/OR A NUMBER</strong> in each gap.
          </p>
        </div>

        {/* Table or Form Content */}
        {payload.table_data ? this.renderTable() : this.renderForm()}
      </div>
    );
  }

  renderTable = () => {
    const { question, answers } = this.props;
    const payload = question.payload;
    
    return (
      <table className="qti-table">
        <thead>
          {payload.table_data.headers && (
            <tr>
              {payload.table_data.headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {payload.table_data.rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.cells.map((cell, cellIdx) => (
                <td key={cellIdx} className={cell.isBlank ? 'qti-table-blank' : ''}>
                  {cell.isBlank ? (
                    <span className="qti-text-input-container">
                      {this.renderQuestionNumber()}
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
                  ) : (
                    cell.content
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  renderForm = () => {
    const { question, answers } = this.props;
    const payload = question.payload;
    
    return (
      <div className="qti-form-container">
        <h4>{payload.form_title || 'Form Details'}</h4>
        {payload.fields && payload.fields.map((field, idx) => (
          <div key={idx} className="qti-form-field">
            <span className="qti-form-label">{field.label}</span>
            {field.isBlank ? (
              <span className="qti-text-input-container">
                {this.renderQuestionNumber()}
                <input
                  type="text"
                  className="qti-text-input expandable"
                  value={this.getCurrentAnswer()}
                  onChange={(e) => this.handleAnswerChange(e.target.value)}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  size="15"
                />
              </span>
            ) : (
              <span>{field.content}</span>
            )}
          </div>
        ))}
      </div>
    );
  };
}

export default FillInGaps;