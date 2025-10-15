import React from 'react';
import { QTIListeningBase } from './QTIListeningBase';

/**
 * QTI-compliant Map/Plan Labeling component
 * Based on /app/Question type/Listening/Labelling on a map/
 */
export class MapLabeling extends QTIListeningBase {
  render() {
    const { question } = this.props;
    const payload = question.payload;
    
    return (
      <div 
        className={this.getQTIClasses('qti-map-labeling')}
        onClick={this.handleQuestionClick}
        data-question-index={question.index}
      >
        {/* Question Type Header */}
        <div className="qti-rubric">
          <strong>Labelling on a Map</strong>
        </div>
        
        {/* Instructions */}
        <div className="qti-instructions">
          <p>
            <strong>Questions {payload.question_range || question.index}</strong><br/>
            Label the map below. Choose your answers from the box and write the correct letter, <strong>A-I</strong>, next to questions {payload.question_range || question.index}.
          </p>
        </div>

        {/* Map Image */}
        {payload.image_url && (
          <div className="qti-map-container">
            <img 
              src={payload.image_url} 
              alt="Map for labeling" 
              className="qti-image qti-map-image"
            />
          </div>
        )}

        {/* Answer Options Box */}
        <div className="qti-answer-box">
          <div className="qti-answer-box-title">Answer Options:</div>
          <div className="qti-answer-options">
            {payload.options && payload.options.map((option, idx) => {
              const optionKey = String.fromCharCode(65 + idx); // A, B, C, ...
              return (
                <div key={idx} className="qti-answer-option">
                  <strong>{optionKey}</strong> {option}
                </div>
              );
            })}
          </div>
        </div>

        {/* Question with Dropdown */}
        <div className="qti-question-content">
          <div className="flex items-start gap-2">
            {this.renderQuestionNumber()}
            <div className="flex-1">
              <div className="qti-map-question">
                <span className="qti-location-label">{payload.prompt}</span>
                <select
                  className="qti-dropdown ml-3"
                  value={this.getCurrentAnswer()}
                  onChange={(e) => this.handleAnswerChange(e.target.value)}
                  onFocus={this.handleFocus}
                >
                  <option value="">---</option>
                  {payload.options && payload.options.map((option, idx) => {
                    const optionKey = String.fromCharCode(65 + idx);
                    return (
                      <option key={idx} value={optionKey}>
                        {optionKey}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapLabeling;