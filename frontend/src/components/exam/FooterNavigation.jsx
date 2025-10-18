import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FooterNavigation = ({
  currentQuestion,
  totalQuestions,
  isReviewMarked,
  onToggleReview,
  onPrevious,
  onNext,
  onSubmit
}) => {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className="footer-navigation">
      <div className="footer-left">
        <label className="review-checkbox">
          <input
            type="checkbox"
            checked={isReviewMarked}
            onChange={onToggleReview}
          />
          <span>Mark for Review</span>
        </label>
      </div>

      <div className="footer-center">
        <span className="question-counter">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>

      <div className="footer-right">
        <button
          className="nav-btn nav-btn-previous"
          onClick={onPrevious}
          disabled={isFirstQuestion}
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        {isLastQuestion ? (
          <button
            className="nav-btn nav-btn-submit"
            onClick={onSubmit}
          >
            Submit Test
          </button>
        ) : (
          <button
            className="nav-btn nav-btn-next"
            onClick={onNext}
          >
            Next
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FooterNavigation;