import React from 'react';
import QuestionBase from '../common/QuestionBase';

/**
 * Map Labeling - Listening
 * Label locations on a map or plan
 */
const MapLabeling = ({ question, answer, onChange }) => {
  const prompt = question.payload?.prompt || '';
  const mapImage = question.payload?.map_image || question.payload?.image_url || '';
  const options = question.payload?.options || ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  
  return (
    <QuestionBase questionNumber={question.index} questionType="map-labeling">
      <div className="flex items-start gap-3 mb-4">
        <span className="font-semibold text-lg min-w-[3rem] text-gray-700">
          {question.index}.
        </span>
        <div className="flex-1">
          <p className="text-gray-800 mb-3 font-medium">{prompt}</p>
          
          {mapImage && (
            <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <img 
                src={mapImage} 
                alt="Map for labeling" 
                className="w-full max-w-2xl mx-auto"
              />
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-700">Select location:</label>
            <select
              value={answer || ''}
              onChange={(e) => onChange(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="">-- Choose --</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </QuestionBase>
  );
};

export default MapLabeling;