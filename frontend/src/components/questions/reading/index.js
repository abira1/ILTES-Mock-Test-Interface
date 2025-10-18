// Import components first
import MultipleChoiceSingle from './MultipleChoiceSingle';
import MultipleChoiceMultiple from './MultipleChoiceMultiple';
import TrueFalseNotGiven from './TrueFalseNotGiven';
import SentenceCompletion from './SentenceCompletion';
import NoteCompletion from './NoteCompletion';
import MatchingHeadings from './MatchingHeadings';
import MatchingFeatures from './MatchingFeatures';
import MatchingSentenceEndings from './MatchingSentenceEndings';
import SummaryCompletionList from './SummaryCompletionList';
import SummaryCompletionText from './SummaryCompletionText';
import TableCompletion from './TableCompletion';
import FlowchartCompletion from './FlowchartCompletion';

// Export components
export { 
  MultipleChoiceSingle,
  MultipleChoiceMultiple,
  TrueFalseNotGiven,
  SentenceCompletion,
  NoteCompletion,
  MatchingHeadings,
  MatchingFeatures,
  MatchingSentenceEndings,
  SummaryCompletionList,
  SummaryCompletionText,
  TableCompletion,
  FlowchartCompletion
};

// Component mapping for dynamic rendering
export const READING_COMPONENTS = {
  'multiple_choice_single_reading': MultipleChoiceSingle,
  'multiple_choice_multiple_reading': MultipleChoiceMultiple,
  'true_false_not_given': TrueFalseNotGiven,
  'sentence_completion_reading': SentenceCompletion,
  'note_completion': NoteCompletion,
  'matching_headings': MatchingHeadings,
  'matching_features': MatchingFeatures,
  'matching_sentence_endings': MatchingSentenceEndings,
  'summary_completion_list': SummaryCompletionList,
  'summary_completion_text': SummaryCompletionText,
  'table_completion_reading': TableCompletion,
  'flowchart_completion_reading': FlowchartCompletion
};

// Get component by question type
export function getReadingComponent(questionType) {
  return READING_COMPONENTS[questionType] || null;
}