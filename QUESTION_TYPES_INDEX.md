# IELTS Practice Test Platform - Complete Question Types Index

**Generated on:** January 2025  
**Total Question Types:** 27

---

## 📋 Overview

This platform supports **3 test types** (Listening, Reading, Writing) with **27 unique question types** that follow official IELTS format standards. All question types are defined in `/app/backend/question_type_schemas.py` with complete schemas, validation rules, and grading methods.

---

## 🎧 LISTENING QUESTION TYPES (12 types)

| # | Question Type | Technical Name | Auto-Grade | UI Component | Description |
|---|---------------|----------------|------------|--------------|-------------|
| 1 | **Multiple Choice (Single)** | `multiple_choice_single` | ✅ Yes | RadioButtons | Choose ONE correct answer from 3-4 options |
| 2 | **Multiple Choice (Multiple)** | `multiple_choice_multiple` | ✅ Yes | Checkboxes | Choose TWO or more correct answers |
| 3 | **Matching** | `matching` | ✅ Yes | MatchingDraggable | Match items from one list to another |
| 4 | **Map/Plan Labeling** | `map_labeling` | ✅ Yes | DropdownWithImage | Label locations on a map or plan |
| 5 | **Diagram Labeling** | `diagram_labeling` | ✅ Yes | InlineTextInput | Label parts of a diagram |
| 6 | **Form Completion** | `form_completion` | ✅ Yes | FormComponent | Fill in missing fields in a form |
| 7 | **Note Completion** | `note_completion_listening` | ✅ Yes | NoteComponent | Complete notes or an outline |
| 8 | **Table Completion** | `table_completion_listening` | ✅ Yes | TableComponent | Fill in missing information in a table |
| 9 | **Flowchart Completion** | `flowchart_completion_listening` | ✅ Yes | FlowchartComponent | Complete steps in a flowchart or process |
| 10 | **Summary Completion** | `summary_completion_listening` | ✅ Yes | SummaryComponent | Complete a summary paragraph |
| 11 | **Sentence Completion** | `sentence_completion_listening` | ✅ Yes | InlineTextInput | Complete a sentence with missing words |
| 12 | **Short-Answer Questions** | `short_answer_listening` | ✅ Yes | TextInput | Answer questions with short responses |

### QTI-Based Listening Components
Special QTI (Question and Test Interoperability) implementations are available in `/app/frontend/src/components/questions/qti/`:
- `FillInGaps.jsx` - Form/table completion with inline inputs
- `FillInGapsShortAnswers.jsx` - Sentence completion with blanks
- `MultipleChoiceSingle.jsx` - Single answer radio buttons
- `MultipleChoiceMultiple.jsx` - Multi-select checkboxes
- `FormCompletion.jsx` - Complex forms with diagrams/SVG support
- `MapLabeling.jsx` - Image-based labeling with dropdown selection
- `Matching.jsx` - Drag-and-drop style matching interface
- `SentenceCompletion.jsx` - Multiple sentence completion
- `TableCompletion.jsx` - Table with multiple input cells
- `FlowchartCompletion.jsx` - Process completion (vertical/horizontal)

---

## 📖 READING QUESTION TYPES (14 types)

| # | Question Type | Technical Name | Auto-Grade | UI Component | Description |
|---|---------------|----------------|------------|--------------|-------------|
| 1 | **Multiple Choice (Single)** | `multiple_choice_single_reading` | ✅ Yes | RadioButtons | Choose ONE correct answer |
| 2 | **Multiple Choice (Multiple)** | `multiple_choice_multiple_reading` | ✅ Yes | Checkboxes | Choose TWO or more correct answers |
| 3 | **True/False/Not Given** | `true_false_not_given` | ✅ Yes | ThreeButtonChoice | Identify if statements are True, False, or Not Given |
| 4 | **Yes/No/Not Given** | `yes_no_not_given` | ✅ Yes | ThreeButtonChoice | Identify if statements are Yes, No, or Not Given |
| 5 | **Note Completion** | `note_completion_reading` | ✅ Yes | NoteComponent | Complete notes using words from passage |
| 6 | **Matching Headings** | `matching_headings` | ✅ Yes | HeadingMatcher | Match headings to paragraphs |
| 7 | **Summary Completion (Text)** | `summary_completion_text` | ✅ Yes | SummaryComponent | Complete summary using words from passage |
| 8 | **Summary Completion (List)** | `summary_completion_list` | ✅ Yes | SummaryWithWordList | Complete summary by selecting from word list |
| 9 | **Flowchart Completion** | `flowchart_completion_reading` | ✅ Yes | FlowchartComponent | Complete flowchart using words from passage |
| 10 | **Sentence Completion** | `sentence_completion_reading` | ✅ Yes | TextInput | Complete sentences using words from passage |
| 11 | **Matching Sentence Endings** | `matching_sentence_endings` | ✅ Yes | SentenceEndingMatcher | Match sentence beginnings to correct endings |
| 12 | **Table Completion** | `table_completion_reading` | ✅ Yes | TableComponent | Fill in table using information from passage |
| 13 | **Matching Features** | `matching_features` | ✅ Yes | FeatureMatcher | Match features to statements or categories |
| 14 | **Matching Paragraphs** | `matching_paragraphs` | ✅ Yes | ParagraphMatcher | Match statements to paragraphs |

### Reading Question Components
Reading-specific components in `/app/frontend/src/components/questions/`:
- `MatchingParagraphs.jsx`
- `TrueFalseNotGiven.jsx`
- `ShortAnswerReading.jsx`
- `MultipleChoiceMultiple.jsx`
- `NoteCompletion.jsx`
- `MatchingHeadings.jsx`
- `SummaryCompletion.jsx`
- `SummaryCompletionList.jsx`
- `FlowchartCompletion.jsx`
- `MatchingSentenceEndings.jsx`
- `TableCompletion.jsx`
- `MatchingFeatures.jsx`
- `MatchingDraggable.jsx`

---

## ✍️ WRITING QUESTION TYPES (1 type)

| # | Question Type | Technical Name | Auto-Grade | UI Component | Description |
|---|---------------|----------------|------------|--------------|-------------|
| 1 | **Writing Task** | `writing_task` | ❌ No (Manual Only) | WritingTextarea | Essay or report writing with word requirement |

**Writing Task Sub-types:**
- **Task 1**: Chart/graph description (150 words minimum) - May include chart_image
- **Task 2**: Essay writing (250 words minimum) - No chart

### Writing Interface
- Horizontal split layout (Task prompt on left, writing area on right)
- Real-time word counter with status indicators
- Page navigation between Task 1 and Task 2
- Highlight and note-taking features for task prompts
- Manual grading workflow in admin panel

---

## 🔧 Technical Implementation Details

### Backend Schema Location
**File:** `/app/backend/question_type_schemas.py`

**Key Features:**
- Complete question type definitions with validation schemas
- Automatic type detection from JSON structure
- Field-level validation with Pydantic models
- Grading method specifications for each type
- UI component mapping for frontend rendering

### Frontend Component Structure
```
/app/frontend/src/components/
├── questions/                    # Reading question components
│   ├── MatchingParagraphs.jsx
│   ├── TrueFalseNotGiven.jsx
│   ├── MultipleChoiceMultiple.jsx
│   └── ...
└── questions/qti/                # QTI Listening components
    ├── FillInGaps.jsx
    ├── MultipleChoiceSingle.jsx
    ├── MapLabeling.jsx
    └── ...
```

### Auto-Grading Methods

| Grading Method | Question Types | Description |
|----------------|----------------|-------------|
| `exact_match` | Multiple choice, map labeling, matching paragraphs | Exact string/letter match (case-sensitive for options) |
| `case_insensitive` | Short answer, sentence completion, diagram labeling | Case-insensitive string comparison |
| `set_match` | Multiple choice (multiple answers) | Compare sets of selected options |
| `mapping_match` | Matching, matching features | Compare key-value mappings |
| `case_insensitive_per_blank` | Summary completion, note completion | Check each blank individually (case-insensitive) |
| `case_insensitive_per_cell` | Table completion | Check each table cell individually |
| `case_insensitive_per_step` | Flowchart completion | Check each step individually |
| `manual_only` | Writing tasks | Manual grading by instructor |

---

## 📊 Statistics Summary

| Category | Count | Auto-Gradable | Manual Grading |
|----------|-------|---------------|----------------|
| **Listening** | 12 types | 12 (100%) | 0 |
| **Reading** | 14 types | 14 (100%) | 0 |
| **Writing** | 1 type | 0 (0%) | 1 (100%) |
| **TOTAL** | **27 types** | **26 (96.3%)** | **1 (3.7%)** |

---

## 🎯 Question Type Usage in Tests

### Current Test Implementations

1. **IELTS Listening Practice Test 1**
   - Exam ID: `ielts-listening-practice-test-1`
   - Total Questions: 40
   - Uses: QTI-compliant listening question types
   - Audio: 31:24 minutes + 2 min review

2. **IELTS Reading Practice Test 1**
   - Exam ID: `ielts-reading-practice-test-1`
   - Total Questions: 40 (across 3 passages)
   - Uses: All 14 reading question types
   - Duration: 60 minutes

3. **IELTS Writing Practice Test 1**
   - Exam ID: `ielts-writing-practice-test-1`
   - Total Questions: 2 (Task 1 & Task 2)
   - Uses: writing_task type
   - Duration: 60 minutes

---

## 🔍 Type Detection & Validation

The system includes sophisticated auto-detection capabilities:

### Detection Rules
Each question type has unique detection signatures based on:
- **Required fields**: Must-have fields for type identification
- **Field types**: Expected data types (list, dict, str, int)
- **Indicators**: Special markers (has_checkboxes, is_matching, has_diagram, etc.)

### Validation Functions
- `detect_question_type(question_data)` - Auto-detect type from JSON structure
- `validate_question_structure(question_data, question_type)` - Validate against schema
- `get_grading_method(question_type)` - Get grading method for type
- `is_auto_gradable(question_type)` - Check if type supports auto-grading

---

## 📝 Example Question Structures

### Listening - Multiple Choice Single
```json
{
  "index": 1,
  "type": "multiple_choice_single",
  "prompt": "What is the speaker's main concern?",
  "options": ["Cost", "Time", "Quality", "Safety"],
  "answer_key": "C",
  "marks": 1
}
```

### Reading - True/False/Not Given
```json
{
  "index": 9,
  "type": "true_false_not_given",
  "prompt": "All kinds of music can enhance brain performance.",
  "options": ["TRUE", "FALSE", "NOT GIVEN"],
  "answer_key": "NOT GIVEN",
  "marks": 1
}
```

### Writing - Task
```json
{
  "index": 1,
  "type": "writing_task",
  "instructions": "You should spend about 20 minutes on this task.",
  "prompt": "The chart below shows milk export figures...",
  "chart_image": "https://example.com/chart.png",
  "min_words": 150,
  "task_number": 1,
  "answer_key": null,
  "marks": 1
}
```

---

## 🚀 Adding New Question Types

To add a new question type to the system:

1. **Define Schema** in `question_type_schemas.py`:
   - Add to `QUESTION_TYPE_SCHEMAS` dictionary
   - Define structure, validation rules, grading method
   - Add detection rules to `TYPE_DETECTION_RULES`

2. **Create Frontend Component**:
   - For listening: Add to `/app/frontend/src/components/questions/qti/`
   - For reading: Add to `/app/frontend/src/components/questions/`
   - Export from `index.js` and map in component mapping

3. **Update Grading Logic** in `/app/backend/server.py`:
   - Add grading logic in submission endpoint
   - Support both auto-grading and manual grading paths

4. **Test Implementation**:
   - Create sample questions with new type
   - Test auto-detection and validation
   - Verify frontend rendering and answer collection
   - Test auto-grading accuracy

---

## 📚 Related Files

### Backend
- `/app/backend/question_type_schemas.py` - Complete schema definitions
- `/app/backend/server.py` - Question CRUD and grading endpoints
- `/app/backend/init_ielts_test.py` - Listening test initialization
- `/app/backend/init_reading_test.py` - Reading test initialization
- `/app/backend/init_writing_test.py` - Writing test initialization

### Frontend
- `/app/frontend/src/components/ListeningTest.jsx` - Listening test interface
- `/app/frontend/src/components/ReadingTest.jsx` - Reading test interface
- `/app/frontend/src/components/WritingTest.jsx` - Writing test interface
- `/app/frontend/src/components/questions/` - Reading question components
- `/app/frontend/src/components/questions/qti/` - QTI listening components

---

**Last Updated:** January 2025  
**Platform Version:** 2.0  
**IELTS Compliance:** Full support for all official question types
