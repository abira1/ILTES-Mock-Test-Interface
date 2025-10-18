// Import components first
import WritingTask1 from './WritingTask1';
import WritingTask2 from './WritingTask2';

// Export components
export { WritingTask1, WritingTask2 };

// Component mapping for dynamic rendering
export const WRITING_COMPONENTS = {
  'writing_task_1': WritingTask1,
  'writing_task_2': WritingTask2
};

// Get component by question type
export function getWritingComponent(questionType) {
  return WRITING_COMPONENTS[questionType] || null;
}