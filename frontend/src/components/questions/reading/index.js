// Reading Question Components
export { default as MultipleChoiceSingle } from './MultipleChoiceSingle';
export { default as MultipleChoiceMultiple } from './MultipleChoiceMultiple';
export { default as TrueFalseNotGiven } from './TrueFalseNotGiven';
export { default as SentenceCompletion } from './SentenceCompletion';
export { default as NoteCompletion } from './NoteCompletion';
export { default as MatchingHeadings } from './MatchingHeadings';
export { default as MatchingFeatures } from './MatchingFeatures';
export { default as MatchingSentenceEndings } from './MatchingSentenceEndings';
export { default as SummaryCompletionList } from './SummaryCompletionList';
export { default as SummaryCompletionText } from './SummaryCompletionText';
export { default as TableCompletion } from './TableCompletion';
export { default as FlowchartCompletion } from './FlowchartCompletion';

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