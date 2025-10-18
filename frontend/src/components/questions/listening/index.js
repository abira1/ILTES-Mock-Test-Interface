// Import components first
import MultipleChoiceSingle from './MultipleChoiceSingle';
import MultipleChoiceMultiple from './MultipleChoiceMultiple';
import SentenceCompletion from './SentenceCompletion';
import FillInGaps from './FillInGaps';
import FormCompletion from './FormCompletion';
import FillInGapsShortAnswers from './FillInGapsShortAnswers';
import MapLabeling from './MapLabeling';
import Matching from './Matching';
import TableCompletion from './TableCompletion';
import FlowchartCompletion from './FlowchartCompletion';

// Export components
export { 
  MultipleChoiceSingle,
  MultipleChoiceMultiple,
  SentenceCompletion,
  FillInGaps,
  FormCompletion,
  FillInGapsShortAnswers,
  MapLabeling,
  Matching,
  TableCompletion,
  FlowchartCompletion
};

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