// QTI Listening Question Type Components
// Export all QTI-compliant listening components

export { QTIListeningBase } from './QTIListeningBase';
export { FillInGaps } from './FillInGaps';
export { FillInGapsShortAnswers } from './FillInGapsShortAnswers';
export { MultipleChoiceSingle } from './MultipleChoiceSingle';
export { MultipleChoiceMultiple } from './MultipleChoiceMultiple';
export { FormCompletion } from './FormCompletion';
export { MapLabeling } from './MapLabeling';
export { Matching } from './Matching';
export { SentenceCompletion } from './SentenceCompletion';
export { TableCompletion } from './TableCompletion';
export { FlowchartCompletion } from './FlowchartCompletion';

// Question type mapping for dynamic rendering
export const QTI_LISTENING_COMPONENTS = {
  'fill_in_gaps': FillInGaps,
  'fill_in_gaps_short_answers': FillInGapsShortAnswers,
  'multiple_choice_single': MultipleChoiceSingle,
  'multiple_choice_multiple': MultipleChoiceMultiple,
  'form_completion': FormCompletion,
  'map_labeling': MapLabeling,
  'matching': Matching,
  'sentence_completion': SentenceCompletion,
  'table_completion': TableCompletion,
  'flowchart_completion': FlowchartCompletion
};

// Get component by question type
export function getQTIListeningComponent(questionType) {
  return QTI_LISTENING_COMPONENTS[questionType] || null;
}