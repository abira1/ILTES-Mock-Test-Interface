import React, { useState, useEffect } from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Writing Task 1 - Writing
 * Describe visual information (chart, graph, diagram)
 */
const WritingTask1 = ({ question, answer, onChange }) => {
  const instructions = question.payload?.instructions || 'You should spend about 20 minutes on this task.';
  const prompt = question.payload?.prompt || '';
  const chartImage = question.payload?.chart_image || '';
  const minWords = question.payload?.min_words || 150;
  
  const [wordCount, setWordCount] = useState(0);
  
  useEffect(() => {
    if (answer) {
      const words = answer.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  }, [answer]);
  
  const isMinimumMet = wordCount >= minWords;
  
  return (
    <QuestionBase questionNumber={question.index} questionType="writing-task-1">
      <div className="mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Writing Task 1</h3>
          <p className="text-sm text-blue-800">{instructions}</p>
        </div>
        
        <div className="mb-4">
          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{prompt}</p>
          </div>
          
          {chartImage && (
            <div className="my-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <img 
                src={chartImage} 
                alt="Chart for Task 1" 
                className="w-full max-w-3xl mx-auto"
              />
            </div>
          )}
        </div>
        
        <div className="relative">
          <textarea
            value={answer || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none font-sans"
            placeholder="Write your answer here..."
          />
          
          <div className={`mt-2 text-sm font-medium ${
            isMinimumMet ? 'text-green-600' : 'text-orange-600'
          }`}>
            Word count: {wordCount} / {minWords} minimum
            {!isMinimumMet && wordCount > 0 && (
              <span className="ml-2">({minWords - wordCount} more words needed)</span>
            )}
          </div>
        </div>
      </div>
    </QuestionBase>
  );
};

export default WritingTask1;