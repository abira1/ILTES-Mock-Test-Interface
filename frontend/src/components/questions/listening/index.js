// Listening Question Components
export { default as MultipleChoiceSingle } from './MultipleChoiceSingle';
export { default as MultipleChoiceMultiple } from './MultipleChoiceMultiple';
export { default as SentenceCompletion } from './SentenceCompletion';
export { default as FillInGaps } from './FillInGaps';
export { default as FormCompletion } from './FormCompletion';
export { default as FillInGapsShortAnswers } from './FillInGapsShortAnswers';
export { default as MapLabeling } from './MapLabeling';
export { default as Matching } from './Matching';
export { default as TableCompletion } from './TableCompletion';
export { default as FlowchartCompletion } from './FlowchartCompletion';

// Component mapping for dynamic rendering
export const LISTENING_COMPONENTS = {
  'multiple_choice_single_listening': MultipleChoiceSingle,
  'multiple_choice_multiple_listening': MultipleChoiceMultiple,
  'sentence_completion_listening': SentenceCompletion,
  'fill_in_gaps': FillInGaps,
  'form_completion': FormCompletion,
  'fill_in_gaps_short_answers': FillInGapsShortAnswers,
  'map_labeling': MapLabeling,
  'matching_listening': Matching,
  'table_completion_listening': TableCompletion,
  'flowchart_completion_listening': FlowchartCompletion
};

// Get component by question type
export function getListeningComponent(questionType) {
  return LISTENING_COMPONENTS[questionType] || null;
}