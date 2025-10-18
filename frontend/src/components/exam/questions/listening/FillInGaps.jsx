import React from 'react';

const FillInGaps = ({ question, answer, onAnswerChange }) => {
  const { prompt, blanks, table, form } = question.payload || {};

  const handleInputChange = (index, value) => {
    const newAnswer = Array.isArray(answer) ? [...answer] : [];
    newAnswer[index] = value;
    onAnswerChange(newAnswer);
  };

  const renderPromptWithBlanks = () => {
    if (!prompt || !blanks) return null;

    let parts = [prompt];
    blanks.forEach((blank, index) => {
      const lastPart = parts[parts.length - 1];
      const blankPattern = /____+|\[\s*\]|\{\s*\}/;
      const splitParts = lastPart.split(blankPattern);
      
      if (splitParts.length > 1) {
        parts[parts.length - 1] = splitParts[0];
        parts.push(
          <input
            key={`blank-${index}`}
            type="text"
            className="gap-input"
            value={(answer && answer[index]) || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            maxLength={blank.maxLength || 20}
            placeholder=""
            autoComplete="off"
          />
        );
        if (splitParts[1]) {
          parts.push(splitParts[1]);
        }
      }
    });

    return <div className="prompt-with-blanks">{parts}</div>;
  };

  const renderTable = () => {
    if (!table) return null;

    return (
      <table className="completion-table">
        <tbody>
          {table.rows && table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.cells && row.cells.map((cell, cellIndex) => {
                if (cell.type === 'input') {
                  return (
                    <td key={cellIndex} className="input-cell">
                      <input
                        type="text"
                        className="table-input"
                        value={(answer && answer[cell.index || cellIndex]) || ''}
                        onChange={(e) => handleInputChange(cell.index || cellIndex, e.target.value)}
                        maxLength={cell.maxLength || 20}
                        autoComplete="off"
                      />
                    </td>
                  );
                } else {
                  return (
                    <td key={cellIndex} className="label-cell">
                      {cell.content}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderForm = () => {
    if (!form || !form.fields) return null;

    return (
      <div className="completion-form">
        {form.fields.map((field, index) => (
          <div key={index} className="form-field">
            <label className="form-label">{field.label}</label>
            {field.type === 'input' ? (
              <input
                type="text"
                className="form-input"
                value={(answer && answer[field.index || index]) || ''}
                onChange={(e) => handleInputChange(field.index || index, e.target.value)}
                maxLength={field.maxLength || 20}
                autoComplete="off"
              />
            ) : (
              <div className="form-value">{field.value}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fill-in-gaps-question">
      {question.payload?.context && (
        <div className="question-context">
          {question.payload.context}
        </div>
      )}

      {prompt && renderPromptWithBlanks()}
      {table && renderTable()}
      {form && renderForm()}

      {question.payload?.image && (
        <img 
          src={question.payload.image} 
          alt="Question diagram"
          className="question-image"
        />
      )}
    </div>
  );
};

export default FillInGaps;