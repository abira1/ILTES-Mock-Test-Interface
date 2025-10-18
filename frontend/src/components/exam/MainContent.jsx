import React, { forwardRef } from 'react';

// Listening question types
import FillInGaps from './questions/listening/FillInGaps';
import FillInGapsShortAnswers from './questions/listening/FillInGapsShortAnswers';
import FlowchartCompletionListening from './questions/listening/FlowchartCompletion';
import FormCompletion from './questions/listening/FormCompletion';
import MapLabeling from './questions/listening/MapLabeling';
import MatchingListening from './questions/listening/Matching';
import MultipleChoiceMultipleListening from './questions/listening/MultipleChoiceMultiple';
import MultipleChoiceSingleListening from './questions/listening/MultipleChoiceSingle';
import SentenceCompletionListening from './questions/listening/SentenceCompletion';
import TableCompletionListening from './questions/listening/TableCompletion';

// Reading question types
import FlowchartCompletionReading from './questions/reading/FlowchartCompletion';
import MatchingFeatures from './questions/reading/MatchingFeatures';
import MatchingHeadings from './questions/reading/MatchingHeadings';
import MatchingSentenceEndings from './questions/reading/MatchingSentenceEndings';
import MultipleChoiceMultipleReading from './questions/reading/MultipleChoiceMultiple';
import MultipleChoiceSingleReading from './questions/reading/MultipleChoiceSingle';
import NoteCompletion from './questions/reading/NoteCompletion';
import SentenceCompletionReading from './questions/reading/SentenceCompletion';
import SummaryCompletionList from './questions/reading/SummaryCompletionList';
import SummaryCompletionText from './questions/reading/SummaryCompletionText';
import TableCompletionReading from './questions/reading/TableCompletion';
import TrueFalseNotGiven from './questions/reading/TrueFalseNotGiven';

// Writing question types
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

    const questionType = question.type?.toLowerCase().replace(/-/g, '_');

    switch (questionType) {
      // === LISTENING QUESTION TYPES ===
      case 'fill_in_gaps':
      case 'fill_in_the_gaps':
        return <FillInGaps {...props} />;
      
      case 'form_completion':
        return <FormCompletion {...props} />;
      
      case 'table_completion':
        return <TableCompletionListening {...props} />;
      
      case 'fill_in_gaps_short_answers':
        return <FillInGapsShortAnswers {...props} />;
      
      case 'sentence_completion':
        return <SentenceCompletionListening {...props} />;
      
      case 'flowchart_completion':
      case 'flow_chart_completion':
        return <FlowchartCompletionListening {...props} />;
      
      case 'map_labeling':
      case 'map_labelling':
      case 'labelling_on_a_map':
        return <MapLabeling {...props} />;
      
      case 'matching':
        return <MatchingListening {...props} />;
      
      case 'multiple_choice_single':
      case 'mcq_single':
        return <MultipleChoiceSingleListening {...props} />;
      
      case 'multiple_choice_multiple':
      case 'mcq_multiple':
        return <MultipleChoiceMultipleListening {...props} />;
      
      // === READING QUESTION TYPES ===
      case 'true_false_not_given':
      case 'yes_no_not_given':
      case 'identifying_information':
        return <TrueFalseNotGiven {...props} />;
      
      case 'matching_headings':
        return <MatchingHeadings {...props} />;
      
      case 'matching_features':
        return <MatchingFeatures {...props} />;
      
      case 'matching_sentence_endings':
        return <MatchingSentenceEndings {...props} />;
      
      case 'summary_completion_list':
      case 'summary_completion':
        return <SummaryCompletionList {...props} />;
      
      case 'summary_completion_text':
        return <SummaryCompletionText {...props} />;
      
      case 'note_completion':
        return <NoteCompletion {...props} />;
      
      // === WRITING QUESTION TYPES ===
      case 'writing_task_1':
      case 'writing_task1':
        return <WritingTask1 {...props} />;
      
      case 'writing_task_2':
      case 'writing_task2':
        return <WritingTask2 {...props} />;
      
      default:
        return (
          <div className="question-not-implemented">
            <p>Question type "{question.type}" is not yet implemented.</p>
            <p>Detected type: "{questionType}"</p>
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