# NEW QUESTION TYPES IMPLEMENTATION PLAN

## 🎯 Project Overview

**Status:** ✅ Old Question Types REMOVED  
**Next Step:** Implement QTI-based question types from `/app/Question type/` folder

---

## 📊 Question Types Inventory

### 🎧 LISTENING (10 Types)
1. Fill in the gaps
2. Fill in the gaps short answers
3. Flow-chart Completion
4. Form Completion
5. Labelling on a map
6. Matching
7. Multiple Choice (more than one answer)
8. Multiple Choice (one answer)
9. Sentence Completion
10. Table Completion

### 📖 READING (12 Types)
1. Flow-chart Completion (selecting words from the text)
2. Identifying Information (True/False/Not Given)
3. Matching Features
4. Matching Headings
5. Matching Sentence Endings
6. Multiple choice with more than one answer
7. Multiple choice with one answer
8. Note Completion
9. Sentence Completion
10. Summary Completion (selecting from a list of words or phrases)
11. Summary Completion (selecting words from the text)
12. Table Completion

### ✍️ WRITING (2 Types)
1. writing-part-1
2. writing-part-2

**TOTAL: 24 Question Types**

---

## 🔍 Structure Analysis

### Source Format: QTI (Question and Test Interoperability)

Each question type folder contains:

```
Question Type Folder/
├── index.xhtml                      # Main test shell
├── test-content/                    # Question content
│   └── *.xml.xhtml                 # Individual questions
├── instructions/                    # Test instructions
│   ├── preTest.xml.xhtml
│   ├── instructions.xml.xhtml
│   └── holdingPages.xml.xhtml
├── css/                            # Styling (complete set)
│   ├── base.css
│   ├── item.css
│   ├── navigation.css
│   ├── bootstrap.css
│   ├── banner.css
│   └── ... (15+ CSS files)
├── js/                             # JavaScript libraries
│   ├── qti.js                      # QTI engine
│   ├── jquery.js
│   ├── rangy-*.js                  # Text selection/highlighting
│   ├── notes.js                    # Note-taking functionality
│   └── ... (20+ JS files)
└── images/                         # Assets
    └── banner/                     # IELTS logos and banners
```

### Key Components

#### 1. **QTI XML Structure**
- Questions are in XHTML format with `connect:` namespace
- Uses `connect:class="choiceInteraction"` for multiple choice
- Uses `connect:class="textEntryInteraction"` for text inputs
- Question identifiers: `connect:identifier="IELTSREL-*"`
- Response identifiers: `connect:responseIdentifier="*"`

#### 2. **Interactive Features**
- **Note-taking**: Students can add notes to highlighted text
- **Text highlighting**: Using Rangy library for text selection
- **Audio playback**: jQuery jPlayer for listening tests
- **Timer**: Built-in countdown timer with `connect:function="timer"`
- **Navigation**: Question-by-question navigation bar
- **Context menu**: Right-click functionality

#### 3. **Styling System**
- Professional IELTS-compliant design
- Two-column layout for reading (passage left, questions right)
- Responsive design with Bootstrap
- Custom CSS for question types
- Banner with IELTS logos and partner logos

---

## 🏗️ Implementation Strategy

### Phase 1: Extract and Convert Core Components ⏳

#### Backend Implementation

**Step 1.1: Create New Question Type Schemas**
```python
# File: /app/backend/new_question_type_schemas.py

QUESTION_TYPE_SCHEMAS = {
    # LISTENING TYPES
    "fill_in_gaps": {...},
    "fill_in_gaps_short_answers": {...},
    "flowchart_completion_listening": {...},
    "form_completion": {...},
    "map_labeling": {...},
    "matching_listening": {...},
    "multiple_choice_multiple_listening": {...},
    "multiple_choice_single_listening": {...},
    "sentence_completion_listening": {...},
    "table_completion_listening": {...},
    
    # READING TYPES
    "flowchart_completion_reading": {...},
    "true_false_not_given": {...},
    "matching_features": {...},
    "matching_headings": {...},
    "matching_sentence_endings": {...},
    "multiple_choice_multiple_reading": {...},
    "multiple_choice_single_reading": {...},
    "note_completion": {...},
    "sentence_completion_reading": {...},
    "summary_completion_list": {...},
    "summary_completion_text": {...},
    "table_completion_reading": {...},
    
    # WRITING TYPES
    "writing_task_1": {...},
    "writing_task_2": {...}
}
```

**Step 1.2: Parse QTI XML to Extract Question Data**
```python
# File: /app/backend/qti_parser.py

from lxml import etree

def parse_qti_question(xml_file_path):
    """
    Parse QTI XML and extract:
    - Question type (from connect:class)
    - Question prompt
    - Options (for multiple choice)
    - Answer key (from response processing)
    - Images/diagrams
    - Instructions
    """
    pass

def convert_to_json_schema(parsed_data):
    """
    Convert parsed QTI data to our JSON schema format
    """
    pass
```

**Step 1.3: Update Auto-Grading Logic**
```python
# File: /app/backend/grading_engine.py

def grade_submission(question_type, student_answer, correct_answer):
    """
    Grade based on question type:
    - Multiple choice: exact match
    - Text entry: case-insensitive, flexible matching
    - True/False/Not Given: exact match
    - Matching: mapping comparison
    """
    pass
```

#### Frontend Implementation

**Step 2.1: Extract and Adapt CSS**
```bash
# Copy CSS files from QTI folders to React project
/app/frontend/src/styles/qti/
├── base.css          # Base QTI styling
├── item.css          # Question item styling
├── navigation.css    # Navigation bar
├── banner.css        # Header/banner
└── custom.css        # Custom overrides
```

**Step 2.2: Create React Question Components**

Structure:
```
/app/frontend/src/components/questions/
├── listening/
│   ├── FillInGaps.jsx
│   ├── FillInGapsShortAnswers.jsx
│   ├── FlowchartCompletion.jsx
│   ├── FormCompletion.jsx
│   ├── MapLabeling.jsx
│   ├── Matching.jsx
│   ├── MultipleChoiceMultiple.jsx
│   ├── MultipleChoiceSingle.jsx
│   ├── SentenceCompletion.jsx
│   └── TableCompletion.jsx
├── reading/
│   ├── FlowchartCompletion.jsx
│   ├── TrueFalseNotGiven.jsx
│   ├── MatchingFeatures.jsx
│   ├── MatchingHeadings.jsx
│   ├── MatchingSentenceEndings.jsx
│   ├── MultipleChoiceMultiple.jsx
│   ├── MultipleChoiceSingle.jsx
│   ├── NoteCompletion.jsx
│   ├── SentenceCompletion.jsx
│   ├── SummaryCompletionList.jsx
│   ├── SummaryCompletionText.jsx
│   └── TableCompletion.jsx
├── writing/
│   ├── WritingTask1.jsx
│   └── WritingTask2.jsx
└── common/
    ├── QuestionBase.jsx       # Base component for all questions
    ├── HighlightText.jsx      # Text highlighting feature
    ├── NoteTaking.jsx         # Note-taking feature
    └── QuestionNavigation.jsx # Navigation bar
```

**Step 2.3: Implement Key Features**

**Feature 1: Text Highlighting & Notes**
```jsx
// File: /app/frontend/src/components/common/HighlightText.jsx
// Use native browser Selection API or react-highlight-words library
// Store highlights in state/localStorage
```

**Feature 2: QTI-Style Navigation Bar**
```jsx
// File: /app/frontend/src/components/common/QuestionNavigation.jsx
// Features:
// - Question number buttons with states (answered/unanswered/flagged)
// - Previous/Next navigation
// - Flag for review
// - Visual indicators
```

**Feature 3: Multiple Choice Component**
```jsx
// Example: /app/frontend/src/components/listening/MultipleChoiceSingle.jsx

import React from 'react';

const MultipleChoiceSingle = ({ question, answer, onChange }) => {
  return (
    <div className="qti-choice-interaction">
      <span className="question-number">{question.index}</span>
      <p className="prompt">{question.prompt}</p>
      <ul className="choices">
        {question.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          return (
            <li key={letter} className="simple-choice">
              <label>
                <input
                  type="radio"
                  name={`q-${question.index}`}
                  value={letter}
                  checked={answer === letter}
                  onChange={(e) => onChange(e.target.value)}
                />
                <p>{option}</p>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultipleChoiceSingle;
```

**Feature 4: Text Entry Component (Fill in Gaps)**
```jsx
// Example: /app/frontend/src/components/listening/FillInGaps.jsx

const FillInGaps = ({ question, answer, onChange }) => {
  return (
    <div className="qti-text-entry-interaction">
      <span className="question-number">{question.index}</span>
      <div className="prompt-with-blanks">
        {renderPromptWithBlanks(question.prompt, answer, onChange)}
      </div>
    </div>
  );
};

// Helper to render text with inline input fields
const renderPromptWithBlanks = (prompt, answer, onChange) => {
  // Split by __BLANK__ or similar markers
  // Insert <input> elements at blank positions
  // Return JSX with mixed text and inputs
};
```

**Feature 5: True/False/Not Given Component**
```jsx
// Example: /app/frontend/src/components/reading/TrueFalseNotGiven.jsx

const TrueFalseNotGiven = ({ question, answer, onChange }) => {
  const options = ['TRUE', 'FALSE', 'NOT GIVEN'];
  
  return (
    <div className="qti-tfng-interaction">
      <span className="question-number">{question.index}</span>
      <p className="prompt">{question.prompt}</p>
      <ul className="choices">
        {options.map((option) => (
          <li key={option} className="simple-choice">
            <label>
              <input
                type="radio"
                name={`q-${question.index}`}
                value={option}
                checked={answer === option}
                onChange={(e) => onChange(e.target.value)}
              />
              <p>{option}</p>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

---

### Phase 2: Update Test Interfaces 🔄

**Step 3.1: Update ListeningTest.jsx**
```jsx
// Import new question components
import {
  FillInGaps,
  FillInGapsShortAnswers,
  FlowchartCompletion,
  FormCompletion,
  MapLabeling,
  Matching,
  MultipleChoiceMultiple,
  MultipleChoiceSingle,
  SentenceCompletion,
  TableCompletion
} from './questions/listening';

// Component mapping
const LISTENING_COMPONENTS = {
  'fill_in_gaps': FillInGaps,
  'fill_in_gaps_short_answers': FillInGapsShortAnswers,
  'flowchart_completion_listening': FlowchartCompletion,
  'form_completion': FormCompletion,
  'map_labeling': MapLabeling,
  'matching_listening': Matching,
  'multiple_choice_multiple_listening': MultipleChoiceMultiple,
  'multiple_choice_single_listening': MultipleChoiceSingle,
  'sentence_completion_listening': SentenceCompletion,
  'table_completion_listening': TableCompletion
};

// Render function
const renderQuestion = (question) => {
  const Component = LISTENING_COMPONENTS[question.type];
  if (!Component) return <div>Unsupported question type</div>;
  
  return (
    <Component
      question={question}
      answer={answers[question.index]}
      onChange={(value) => handleAnswerChange(question.index, value)}
    />
  );
};
```

**Step 3.2: Update ReadingTest.jsx**
```jsx
// Similar structure for reading question types
import {
  FlowchartCompletion,
  TrueFalseNotGiven,
  MatchingFeatures,
  // ... other reading components
} from './questions/reading';
```

**Step 3.3: Update WritingTest.jsx**
```jsx
// Import writing task components
import { WritingTask1, WritingTask2 } from './questions/writing';
```

---

### Phase 3: Integrate QTI Features 🎨

**Step 4.1: Add QTI CSS Styling**
```bash
# Copy all CSS files from Question type folders
# Merge into React app
# Create custom overrides for React-specific needs
```

**Step 4.2: Implement Note-Taking System**
```jsx
// File: /app/frontend/src/components/common/NoteTaking.jsx
// Features:
// - Add notes to highlighted text
// - Save notes to localStorage/backend
// - Display notes in sidebar
// - Edit/delete notes
```

**Step 4.3: Implement Text Highlighting**
```jsx
// File: /app/frontend/src/components/common/HighlightText.jsx
// Use: react-highlight-words or custom implementation
// Features:
// - Multiple highlight colors
// - Persistent highlights
// - Remove highlights
```

**Step 4.4: Update Navigation System**
```jsx
// File: /app/frontend/src/components/common/QuestionNavigation.jsx
// QTI-style features:
// - Minimized/Maximized view toggle
// - Question state indicators (answered/flagged/current)
// - Section grouping
// - Tooltips on hover
```

---

### Phase 4: Data Migration & Testing 🧪

**Step 5.1: Create Question Migration Script**
```python
# File: /app/backend/migrate_questions.py

def migrate_from_qti_to_json():
    """
    For each QTI question type folder:
    1. Parse XML files
    2. Extract question data
    3. Convert to JSON schema
    4. Save to database
    """
    pass
```

**Step 5.2: Update Existing Tests**
```python
# Update init_ielts_test.py, init_reading_test.py, init_writing_test.py
# Use new question type schemas
# Maintain question content but update structure
```

**Step 5.3: Test Auto-Grading**
```python
# Create test cases for each question type
# Verify grading accuracy
# Test edge cases (partial answers, case sensitivity, etc.)
```

**Step 5.4: Frontend Testing**
- Test each question type component renders correctly
- Verify answer collection works
- Test navigation between questions
- Test highlighting and note-taking features
- Mobile responsiveness check

---

## 📋 Implementation Checklist

### Backend Tasks
- [ ] Create `new_question_type_schemas.py` with all 24 types
- [ ] Build QTI XML parser (`qti_parser.py`)
- [ ] Update grading logic in `server.py`
- [ ] Create question migration script
- [ ] Update existing test initialization scripts
- [ ] Test all auto-grading functions

### Frontend Tasks
- [ ] Extract and integrate QTI CSS files
- [ ] Create 10 listening question components
- [ ] Create 12 reading question components
- [ ] Create 2 writing question components
- [ ] Build QuestionBase component
- [ ] Implement HighlightText component
- [ ] Implement NoteTaking component
- [ ] Update QuestionNavigation component
- [ ] Update ListeningTest.jsx with new components
- [ ] Update ReadingTest.jsx with new components
- [ ] Update WritingTest.jsx with new components

### Features to Implement
- [ ] Text highlighting (multiple colors)
- [ ] Note-taking with persistence
- [ ] QTI-style navigation (minimized/maximized)
- [ ] Question state indicators
- [ ] Context menu for text selection
- [ ] Audio player integration (listening)
- [ ] Timer with QTI styling
- [ ] Banner with IELTS logos

### Testing Tasks
- [ ] Unit tests for each component
- [ ] Integration tests for test interfaces
- [ ] Auto-grading accuracy tests
- [ ] Mobile responsiveness tests
- [ ] Cross-browser compatibility
- [ ] Performance testing (large tests)

---

## 🔧 Technical Considerations

### 1. **XML Parsing Strategy**
- Use Python's `lxml` library for robust XML parsing
- Handle `connect:` namespace properly
- Extract response identifiers for answer keys
- Parse inline images and media

### 2. **Answer Collection Format**
```json
{
  "1": "A",                    // Multiple choice
  "2": "TRUE",                 // True/False/Not Given
  "3": "photosynthesis",       // Text entry
  "4": {"5": "A", "6": "C"},   // Matching
  "7": ["A", "C", "D"]         // Multiple select
}
```

### 3. **Grading Flexibility**
- Case-insensitive for text entries
- Accept alternative spellings
- Partial credit for matching questions
- Ignore extra spaces/punctuation

### 4. **Performance Optimization**
- Lazy load question components
- Cache parsed question data
- Optimize CSS bundle size
- Use React.memo for question components

### 5. **Accessibility**
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

---

## 📈 Project Timeline Estimate

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| **Phase 1** | Backend schemas & parser | 3-4 hours |
| **Phase 2** | Frontend components | 6-8 hours |
| **Phase 3** | QTI features integration | 4-5 hours |
| **Phase 4** | Testing & migration | 3-4 hours |
| **Total** | Full implementation | **16-21 hours** |

---

## 🎯 Success Criteria

1. ✅ All 24 question types render correctly
2. ✅ Answer collection works for all types
3. ✅ Auto-grading accuracy ≥95%
4. ✅ Highlighting and notes persist
5. ✅ Navigation works smoothly
6. ✅ Mobile responsive
7. ✅ No performance regression
8. ✅ Existing tests migrated successfully

---

## 📚 Key Files to Create/Update

### New Files to Create
```
Backend:
- /app/backend/new_question_type_schemas.py
- /app/backend/qti_parser.py
- /app/backend/grading_engine.py
- /app/backend/migrate_questions.py

Frontend:
- /app/frontend/src/components/questions/listening/*.jsx (10 files)
- /app/frontend/src/components/questions/reading/*.jsx (12 files)
- /app/frontend/src/components/questions/writing/*.jsx (2 files)
- /app/frontend/src/components/common/QuestionBase.jsx
- /app/frontend/src/components/common/HighlightText.jsx
- /app/frontend/src/components/common/NoteTaking.jsx
- /app/frontend/src/styles/qti/*.css (15+ files)
```

### Files to Update
```
Backend:
- /app/backend/server.py (import new schemas, update grading)
- /app/backend/init_ielts_test.py (use new question types)
- /app/backend/init_reading_test.py (use new question types)
- /app/backend/init_writing_test.py (use new question types)

Frontend:
- /app/frontend/src/components/ListeningTest.jsx
- /app/frontend/src/components/ReadingTest.jsx
- /app/frontend/src/components/WritingTest.jsx
- /app/frontend/src/components/common/QuestionNavigation.jsx
```

---

## 🚀 Next Steps

1. **Start with Backend Foundation**
   - Create question type schemas
   - Build QTI parser
   - Test with sample XML files

2. **Build Core Frontend Components**
   - Start with simplest types (multiple choice)
   - Add complexity gradually
   - Test each component independently

3. **Integrate Features**
   - Add highlighting
   - Add note-taking
   - Update navigation

4. **Test & Migrate**
   - Test all question types
   - Migrate existing tests
   - Verify auto-grading

---

## 📝 Notes

- QTI XML files are well-structured and follow standard format
- Each question type has complete examples in source folders
- CSS styling is professional and IELTS-compliant
- JavaScript libraries (rangy, notes.js) can be adapted or replaced with React alternatives
- Focus on extracting question structure, not copying entire QTI engine

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** ✅ Ready for Implementation
