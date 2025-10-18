import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Table Completion - Reading
 * Complete table using information from the passage
 */
const TableCompletion = ({ question, answer, onChange }) => {
  const tableTitle = question.payload?.table_title || '';
  const headers = question.payload?.headers || [];
  const rows = question.payload?.rows || [];
  const maxWords = question.payload?.max_words || 3;
  
  const handleCellChange = (rowIndex, value) => {
    if (rows.length === 1) {
      onChange(value);
    } else {
      const currentAnswers = typeof answer === 'object' && answer !== null ? answer : {};
      onChange({
        ...currentAnswers,
        [rowIndex]: value
      });
    }
  };
  
  const getCellValue = (rowIndex) => {
    if (rows.length === 1) {
      return answer || '';
    }
    return (typeof answer === 'object' && answer !== null ? answer[rowIndex] : '') || '';
  };
  
  return (
    <QuestionBase questionNumber={question.index} questionType="table-completion">
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
            {question.index}.
          </span>
          {tableTitle && (
            <h4 className="font-semibold text-gray-800 text-lg">{tableTitle}</h4>
          )}
        </div>
        
        <div className="ml-12 overflow-x-auto">
          <table className="min-w-full border-2 border-gray-300">
            {headers.length > 0 && (
              <thead>
                <tr className="bg-gray-100">
                  {headers.map((header, idx) => (
                    <th key={idx} className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50">
                  {row.cells?.map((cell, cellIdx) => {
                    const isBlank = cell === '__BLANK__' || row.blank_position === cellIdx;
                    
                    return (
                      <td key={cellIdx} className="border border-gray-300 px-4 py-2">
                        {isBlank ? (
                          <input
                            type="text"
                            value={getCellValue(rowIdx)}
                            onChange={(e) => handleCellChange(rowIdx, e.target.value)}
                            className="w-full px-2 py-1 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="..."
                          />
                        ) : (
                          <span className="text-gray-800">{cell}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2">
            Use NO MORE THAN {maxWords} {maxWords === 1 ? 'WORD' : 'WORDS'} from the passage
          </p>
        </div>
      </div>
    </QuestionBase>
  );
};

export default TableCompletion;