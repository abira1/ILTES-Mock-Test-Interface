import React, { forwardRef } from 'react';
// Import question type components
import FillInGaps from './questions/listening/FillInGaps';
import FillInGapsShortAnswers from './questions/listening/FillInGapsShortAnswers';
import MultipleChoiceSingle from './questions/listening/MultipleChoiceSingle';
import MultipleChoiceMultiple from './questions/listening/MultipleChoiceMultiple';
import TrueFalseNotGiven from './questions/reading/TrueFalseNotGiven';
import WritingTask1 from './questions/writing/WritingTask1';
import WritingTask2 from './questions/writing/WritingTask2';

const MainContent = forwardRef((
  { exam, currentQuestion, answer, onAnswerChange },
  ref
) => {
  const getQuestionData = () => {
    if (!exam || !exam.sections) return null;

    // Find the question across all sections
    for (const section of exam.sections) {
      if (section.questions) {
        const question = section.questions.find(q => q.index === currentQuestion);
        if (question) {
          return { ...question, sectionTitle: section.title };
        }
      }
    }
    return null;
  };

  const question = getQuestionData();

  if (!question) {
    return (
      <div className="main-content" ref={ref}>
        <div className="no-question">Question not found</div>
      </div>
    );
  }

  const renderQuestion = () => {
    const props = {
      question,
      answer,
      onAnswerChange
    };

    switch (question.type) {
      // Listening types
      case 'fill_in_gaps':
      case 'form_completion':
      case 'table_completion':
        return <FillInGaps {...props} />;
      
      case 'fill_in_gaps_short_answers':
      case 'sentence_completion':
      case 'note_completion':
        return <FillInGapsShortAnswers {...props} />;
      
      case 'multiple_choice_single':
        return <MultipleChoiceSingle {...props} />;
      
      case 'multiple_choice_multiple':
        return <MultipleChoiceMultiple {...props} />;
      
      // Reading types
      case 'true_false_not_given':
      case 'yes_no_not_given':
        return <TrueFalseNotGiven {...props} />;
      
      // Writing types
      case 'writing_task_1':
        return <WritingTask1 {...props} />;
      
      case 'writing_task_2':
        return <WritingTask2 {...props} />;
      
      default:
        return (
          <div className="question-not-implemented">
            <p>Question type "{question.type}" is not yet implemented.</p>
            <pre>{JSON.stringify(question, null, 2)}</pre>
          </div>
        );
    }
  };

  return (
    <div className="main-content" ref={ref}>
      <div className="question-header">
        <h2 className="section-title">{question.sectionTitle}</h2>
        <div className="question-number">Question {currentQuestion}</div>
      </div>

      {question.instructions && (
        <div className="question-instructions">
          {question.instructions}
        </div>
      )}

      <div className="question-content">
        {renderQuestion()}
      </div>
    </div>
  );
});

MainContent.displayName = 'MainContent';

export default MainContent;