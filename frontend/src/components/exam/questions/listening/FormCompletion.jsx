import React from 'react';

const FormCompletion = ({ question, answer, onAnswerChange }) => {
  const { form, context, image } = question.payload || {};

  const handleInputChange = (index, value) => {
    const newAnswer = Array.isArray(answer) ? [...answer] : [];
    newAnswer[index] = value;
    onAnswerChange(newAnswer);
  };

  const renderFormField = (field, index) => {
    if (field.type === 'input') {
      return (
        <div key={index} className="form-field-row">
          <label className="form-field-label">{field.label}</label>
          <input
            type="text"
            className="form-field-input"
            value={(answer && answer[field.index || index]) || ''}
            onChange={(e) => handleInputChange(field.index || index, e.target.value)}
            maxLength={field.maxLength || 20}
            autoComplete="off"
            placeholder={field.placeholder || ''}
          />
        </div>
      );
    } else if (field.type === 'label') {
      return (
        <div key={index} className="form-field-row">
          <label className="form-field-label">{field.label}</label>
          <div className="form-field-value">{field.value}</div>
        </div>
      );
    } else if (field.type === 'header') {
      return (
        <div key={index} className="form-section-header">
          {field.text}
        </div>
      );
    }
  };

  return (
    <div className="form-completion-question">
      {context && (
        <div className="question-context">
          {context}
        </div>
      )}

      {image && (
        <div className="form-image-container">
          <img 
            src={image} 
            alt="Form diagram" 
            className="form-image"
          />
        </div>
      )}

      <div className="completion-form-container">
        {form && form.fields && form.fields.map((field, index) => 
          renderFormField(field, index)
        )}
      </div>
    </div>
  );
};

export default FormCompletion;