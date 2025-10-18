import React from 'react';

const MapLabeling = ({ question, answer, onAnswerChange }) => {
  const { mapImage, labels, options, context } = question.payload || {};

  const handleLabelChange = (labelIndex, value) => {
    const newAnswer = { ...(answer || {}) };
    newAnswer[labelIndex] = value;
    onAnswerChange(newAnswer);
  };

  return (
    <div className="map-labeling-question">
      {context && (
        <div className="question-context">
          {context}
        </div>
      )}

      {mapImage && (
        <div className="map-container">
          <img 
            src={mapImage} 
            alt="Map" 
            className="map-image"
          />
        </div>
      )}

      <div className="map-labels-section">
        <h4>Label the map:</h4>
        {labels && labels.map((label, index) => (
          <div key={index} className="map-label-item">
            <span className="label-number">{label.number || (question.index + index)}.</span>
            <span className="label-description">{label.description}</span>
            {options ? (
              <select
                className="label-dropdown"
                value={(answer && answer[index]) || ''}
                onChange={(e) => handleLabelChange(index, e.target.value)}
              >
                <option value="">Select...</option>
                {options.map((option, optIndex) => (
                  <option key={optIndex} value={option.value || option}>
                    {option.label || option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="label-input"
                value={(answer && answer[index]) || ''}
                onChange={(e) => handleLabelChange(index, e.target.value)}
                maxLength={label.maxLength || 20}
                autoComplete="off"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLabeling;