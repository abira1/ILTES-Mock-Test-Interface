import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Matching Headings - Reading
 * Match headings to paragraphs or sections
 */
const MatchingHeadings = ({ question, answer, onChange }) => {
  const paragraphRef = question.payload?.paragraph_ref || `Paragraph ${question.index}`;
  const headings = question.payload?.headings || [];
  
  return (
    <QuestionBase questionNumber={question.index} questionType="matching-headings">
      <div className="flex items-start gap-3 mb-4">
        <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
          {question.index}.
        </span>
        <div className="flex-1">
          <p className="text-gray-800 mb-3 font-medium">{paragraphRef}</p>
          
          <select
            value={answer || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
          >
            <option value="">-- Select heading --</option>
            {headings.map((heading) => (
              <option key={heading.key} value={heading.key}>
                {heading.key}. {heading.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </QuestionBase>
  );
};

export default MatchingHeadings;