import React from 'react';

const TableCompletion = ({ question, answer, onAnswerChange }) => {
  const { table, passage, context, wordLimit } = question.payload || {};

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newAnswer = { ...(answer || {}) };
    const key = `${rowIndex}-${colIndex}`;
    newAnswer[key] = value;
    onAnswerChange(newAnswer);
  };

  const renderCell = (cell, rowIndex, colIndex) => {
    if (cell.type === 'input') {
      const key = `${rowIndex}-${colIndex}`;
      return (
        <td key={colIndex} className="input-cell">
          <input
            type="text"
            className="table-cell-input"
            value={(answer && answer[key]) || ''}
            onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
            maxLength={cell.maxLength || wordLimit || 20}
            autoComplete="off"
            placeholder={cell.questionNumber ? `Q${cell.questionNumber}` : ''}
          />
        </td>
      );
    } else if (cell.type === 'header') {
      return (
        <th key={colIndex} className="header-cell">
          {cell.content || cell.text}
        </th>
      );
    } else {
      return (
        <td key={colIndex} className="label-cell">
          {cell.content || cell.text}
        </td>
      );
    }
  };

  return (
    <div className="table-completion-reading-question">
      {passage && (
        <div className="reading-passage">
          <div className="passage-content">{passage}</div>
        </div>
      )}

      {context && (
        <div className="question-context">
          {context}
        </div>
      )}

      {wordLimit && (
        <div className="word-limit-notice">
          Write NO MORE THAN {wordLimit} WORD{wordLimit > 1 ? 'S' : ''} for each answer.
        </div>
      )}

      <div className="table-container">
        <table className="completion-table">
          {table && table.headers && (
            <thead>
              <tr>
                {table.headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {table && table.rows && table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.cells && row.cells.map((cell, colIndex) => 
                  renderCell(cell, rowIndex, colIndex)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCompletion;