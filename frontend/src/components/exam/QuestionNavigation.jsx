import React, { useState } from 'react';

const QuestionNavigation = ({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  reviewMarked,
  onNavigate,
  sections
}) => {
  const [hoveredQuestion, setHoveredQuestion] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getQuestionState = (questionNum) => {
    if (questionNum === currentQuestion) return 'current';
    if (answeredQuestions.includes(questionNum)) return 'answered';
    return 'unanswered';
  };

  const isMarkedForReview = (questionNum) => {
    return reviewMarked.includes(questionNum);
  };

  const getSectionForQuestion = (questionNum) => {
    if (!sections || sections.length === 0) {
      // Default sections: 10 questions each
      const sectionNum = Math.ceil(questionNum / 10);
      return { index: sectionNum, title: `Part ${sectionNum}` };
    }
    
    let cumulative = 0;
    for (const section of sections) {
      cumulative += section.questionCount || 10;
      if (questionNum <= cumulative) {
        return section;
      }
    }
    return sections[sections.length - 1];
  };

  const handleQuestionHover = (questionNum, event) => {
    setHoveredQuestion(questionNum);
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const renderQuestions = () => {
    const questions = [];
    const questionsPerSection = sections && sections.length > 0 
      ? sections.map(s => s.questionCount || 10)
      : [10, 10, 10, 10];

    let questionNum = 1;
    questionsPerSection.forEach((count, sectionIndex) => {
      const sectionQuestions = [];
      for (let i = 0; i < count; i++) {
        const state = getQuestionState(questionNum);
        const marked = isMarkedForReview(questionNum);
        const qNum = questionNum;

        sectionQuestions.push(
          <button
            key={qNum}
            className={`question-nav-btn state-${state} ${marked ? 'marked-review' : ''}`}
            onClick={() => onNavigate(qNum)}
            onMouseEnter={(e) => handleQuestionHover(qNum, e)}
            onMouseLeave={() => setHoveredQuestion(null)}
            data-question={qNum}
          >
            {qNum}
          </button>
        );
        questionNum++;
      }

      questions.push(
        <div key={`section-${sectionIndex}`} className="nav-section">
          <div className="nav-section-label">Part {sectionIndex + 1}</div>
          <div className="nav-section-questions">{sectionQuestions}</div>
        </div>
      );
    });

    return questions;
  };

  return (
    <div className="question-navigation">
      <div className="nav-container">
        {renderQuestions()}
      </div>

      {hoveredQuestion && (
        <div 
          className="question-tooltip"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="tooltip-content">
            {getSectionForQuestion(hoveredQuestion).title} - Question {hoveredQuestion}
          </div>
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default QuestionNavigation;