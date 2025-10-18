"""
New QTI-Based Question Type Schemas
Based on official IELTS QTI question formats from /app/Question type/

This module defines all 24 question types with their structures, validation rules,
and grading methods.
"""

from typing import Dict, List, Any, Optional
from enum import Enum


# ============================================
# QUESTION TYPE ENUMS
# ============================================

class ListeningQuestionType(str, Enum):
    """All IELTS Listening question types (10 types)"""
    FILL_IN_GAPS = "fill_in_gaps"
    FILL_IN_GAPS_SHORT_ANSWERS = "fill_in_gaps_short_answers"
    FLOWCHART_COMPLETION = "flowchart_completion_listening"
    FORM_COMPLETION = "form_completion"
    MAP_LABELING = "map_labeling"
    MATCHING = "matching_listening"
    MULTIPLE_CHOICE_MULTIPLE = "multiple_choice_multiple_listening"
    MULTIPLE_CHOICE_SINGLE = "multiple_choice_single_listening"
    SENTENCE_COMPLETION = "sentence_completion_listening"
    TABLE_COMPLETION = "table_completion_listening"


class ReadingQuestionType(str, Enum):
    """All IELTS Reading question types (12 types)"""
    FLOWCHART_COMPLETION = "flowchart_completion_reading"
    TRUE_FALSE_NOT_GIVEN = "true_false_not_given"
    MATCHING_FEATURES = "matching_features"
    MATCHING_HEADINGS = "matching_headings"
    MATCHING_SENTENCE_ENDINGS = "matching_sentence_endings"
    MULTIPLE_CHOICE_MULTIPLE = "multiple_choice_multiple_reading"
    MULTIPLE_CHOICE_SINGLE = "multiple_choice_single_reading"
    NOTE_COMPLETION = "note_completion"
    SENTENCE_COMPLETION = "sentence_completion_reading"
    SUMMARY_COMPLETION_LIST = "summary_completion_list"
    SUMMARY_COMPLETION_TEXT = "summary_completion_text"
    TABLE_COMPLETION = "table_completion_reading"


class WritingQuestionType(str, Enum):
    """IELTS Writing question types (2 types)"""
    WRITING_TASK_1 = "writing_task_1"
    WRITING_TASK_2 = "writing_task_2"


# ============================================
# COMPLETE QUESTION TYPE SCHEMAS
# ============================================

QUESTION_TYPE_SCHEMAS = {
    
    # ============================================
    # LISTENING QUESTION TYPES (10 types)
    # ============================================
    
    "fill_in_gaps": {
        "name": "Fill in the Gaps",
        "description": "Complete form or table with missing information",
        "test_type": "listening",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "fill_in_gaps"},
            "title": {"type": "string", "required": False},
            "fields": {"type": "array", "required": True, "description": "Fields with labels and answer keys"},
            "max_words": {"type": "integer", "required": False, "default": 3},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 1,
            "type": "fill_in_gaps",
            "title": "Personal Information",
            "fields": [
                {"label": "Name:", "answer_key": "Sarah Wilson", "max_words": 3},
                {"label": "Age:", "answer_key": "25", "max_words": 1}
            ],
            "marks": 2
        },
        "ui_component": "FillInGaps",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    "fill_in_gaps_short_answers": {
        "name": "Fill in the Gaps (Short Answers)",
        "description": "Complete sentences with short answers",
        "test_type": "listening",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "fill_in_gaps_short_answers"},
            "sentences": {"type": "array", "required": True, "description": "Sentences with blanks"},
            "max_words": {"type": "integer", "required": False, "default": 2},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 1,
            "type": "fill_in_gaps_short_answers",
            "sentences": [
                {"text": "The meeting is at __BLANK__.", "answer_key": "3 pm", "max_words": 2},
                {"text": "The venue is __BLANK__.", "answer_key": "conference room", "max_words": 2}
            ],
            "marks": 2
        },
        "ui_component": "FillInGapsShortAnswers",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    "flowchart_completion_listening": {
        "name": "Flowchart Completion",
        "description": "Complete steps in a flowchart or process diagram",
        "test_type": "listening",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "flowchart_completion_listening"},
            "title": {"type": "string", "required": True},
            "steps": {"type": "array", "required": True, "description": "Process steps"},
            "orientation": {"type": "string", "required": False, "default": "vertical"},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 5,
            "type": "flowchart_completion_listening",
            "title": "Application Process",
            "steps": [
                {"text": "Submit application"},
                {"text": "__BLANK__", "answer_key": "Interview", "max_words": 1},
                {"text": "Final decision"}
            ],
            "orientation": "vertical",
            "marks": 1
        },
        "ui_component": "FlowchartCompletion",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    "form_completion": {
        "name": "Form Completion",
        "description": "Fill in missing fields in a form",
        "test_type": "listening",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "form_completion"},
            "form_title": {"type": "string", "required": True},
            "fields": {"type": "array", "required": True},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 1,
            "type": "form_completion",
            "form_title": "Registration Form",
            "fields": [
                {"label": "Full Name:", "answer_key": "John Smith", "max_words": 3},
                {"label": "Phone:", "answer_key": "555-1234", "max_words": 2}
            ],
            "marks": 2
        },
        "ui_component": "FormCompletion",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    "map_labeling": {
        "name": "Labelling on a Map",
        "description": "Label locations on a map or plan",
        "test_type": "listening",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "map_labeling"},
            "prompt": {"type": "string", "required": True},
            "map_image": {"type": "string", "required": True, "description": "Map image URL"},
            "options": {"type": "array", "required": True, "description": "Letter options A-I"},
            "answer_key": {"type": "string", "required": True},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 11,
            "type": "map_labeling",
            "prompt": "Library",
            "map_image": "https://example.com/campus-map.png",
            "options": ["A", "B", "C", "D", "E", "F"],
            "answer_key": "C",
            "marks": 1
        },
        "ui_component": "MapLabeling",
        "auto_grade": True,
        "grading_method": "exact_match"
    },
    
    "matching_listening": {
        "name": "Matching",
        "description": "Match items from one list to another",
        "test_type": "listening",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "matching_listening"},
            "instructions": {"type": "string", "required": True},
            "left_items": {"type": "array", "required": True},
            "right_items": {"type": "array", "required": True},
            "answer_key": {"type": "object", "required": True},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 15,
            "type": "matching_listening",
            "instructions": "Match each speaker to their opinion",
            "left_items": [
                {"id": 1, "text": "Speaker 1"},
                {"id": 2, "text": "Speaker 2"}
            ],
            "right_items": [
                {"key": "A", "text": "Agrees"},
                {"key": "B", "text": "Disagrees"}
            ],
            "answer_key": {"1": "A", "2": "B"},
            "marks": 2
        },
        "ui_component": "Matching",
        "auto_grade": True,
        "grading_method": "mapping_match"
    },
    
    "multiple_choice_multiple_listening": {
        "name": "Multiple Choice (More Than One Answer)",
        "description": "Choose TWO or more correct answers",
        "test_type": "listening",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "multiple_choice_multiple_listening"},
            "prompt": {"type": "string", "required": True},
            "options": {"type": "array", "required": True, "min_items": 4},
            "answer_key": {"type": "array", "required": True},
            "select_count": {"type": "integer", "required": True, "min": 2},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 20,
            "type": "multiple_choice_multiple_listening",
            "prompt": "Which TWO facilities are mentioned?",
            "options": ["Swimming pool", "Gym", "Library", "Cafeteria", "Parking"],
            "answer_key": ["A", "C"],
            "select_count": 2,
            "marks": 1
        },
        "ui_component": "MultipleChoiceMultiple",
        "auto_grade": True,
        "grading_method": "set_match"
    },
    
    "multiple_choice_single_listening": {
        "name": "Multiple Choice (One Answer)",
        "description": "Choose ONE correct answer",
        "test_type": "listening",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "multiple_choice_single_listening"},
            "prompt": {"type": "string", "required": True},
            "options": {"type": "array", "required": True, "min_items": 3, "max_items": 4},
            "answer_key": {"type": "string", "required": True, "pattern": "^[A-D]$"},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 1,
            "type": "multiple_choice_single_listening",
            "prompt": "What is the main topic?",
            "options": ["History", "Science", "Geography", "Literature"],
            "answer_key": "B",
            "marks": 1
        },
        "ui_component": "MultipleChoiceSingle",
        "auto_grade": True,
        "grading_method": "exact_match"
    },
    
    "sentence_completion_listening": {
        "name": "Sentence Completion",
        "description": "Complete sentences with missing words",
        "test_type": "listening",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "sentence_completion_listening"},
            "prompt": {"type": "string", "required": True, "description": "Incomplete sentence"},
            "answer_key": {"type": "string", "required": True},
            "max_words": {"type": "integer", "required": False, "default": 2},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 8,
            "type": "sentence_completion_listening",
            "prompt": "The library opens at __BLANK__.",
            "answer_key": "9 am",
            "max_words": 2,
            "marks": 1
        },
        "ui_component": "SentenceCompletion",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    "table_completion_listening": {
        "name": "Table Completion",
        "description": "Fill in missing information in a table",
        "test_type": "listening",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "table_completion_listening"},
            "table_title": {"type": "string", "required": False},
            "headers": {"type": "array", "required": True},
            "rows": {"type": "array", "required": True},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 10,
            "type": "table_completion_listening",
            "table_title": "Course Schedule",
            "headers": ["Day", "Subject", "Time"],
            "rows": [
                {"cells": ["Monday", "__BLANK__", "10 am"], "blank_position": 1, "answer_key": "Math"},
                {"cells": ["Tuesday", "English", "__BLANK__"], "blank_position": 2, "answer_key": "2 pm"}
            ],
            "marks": 2
        },
        "ui_component": "TableCompletion",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    # ============================================
    # READING QUESTION TYPES (12 types)
    # ============================================
    
    "flowchart_completion_reading": {
        "name": "Flowchart Completion (Selecting Words from Text)",
        "description": "Complete flowchart using words from the passage",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "flowchart_completion_reading"},
            "title": {"type": "string", "required": True},
            "steps": {"type": "array", "required": True},
            "max_words": {"type": "integer", "required": False, "default": 2},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 28,
            "type": "flowchart_completion_reading",
            "title": "Production Process",
            "steps": [
                {"text": "Raw materials"},
                {"text": "__BLANK__", "answer_key": "Quality check", "max_words": 2},
                {"text": "Packaging"}
            ],
            "marks": 1
        },
        "ui_component": "FlowchartCompletion",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    "true_false_not_given": {
        "name": "Identifying Information (True/False/Not Given)",
        "description": "Identify if statements are True, False, or Not Given",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "true_false_not_given"},
            "prompt": {"type": "string", "required": True},
            "options": {"type": "array", "required": True, "value": ["TRUE", "FALSE", "NOT GIVEN"]},
            "answer_key": {"type": "string", "required": True},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 1,
            "type": "true_false_not_given",
            "prompt": "Marie Curie's husband was a joint winner of both Nobel Prizes.",
            "options": ["TRUE", "FALSE", "NOT GIVEN"],
            "answer_key": "FALSE",
            "marks": 1
        },
        "ui_component": "TrueFalseNotGiven",
        "auto_grade": True,
        "grading_method": "exact_match"
    },
    
    "matching_features": {
        "name": "Matching Features",
        "description": "Match features to statements or categories",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "matching_features"},
            "instructions": {"type": "string", "required": True},
            "statements": {"type": "array", "required": True},
            "features": {"type": "array", "required": True},
            "answer_key": {"type": "object", "required": True},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 14,
            "type": "matching_features",
            "instructions": "Match each researcher to their discovery",
            "statements": [
                {"id": 14, "text": "Discovered penicillin"},
                {"id": 15, "text": "Developed theory of relativity"}
            ],
            "features": [
                {"key": "A", "text": "Alexander Fleming"},
                {"key": "B", "text": "Albert Einstein"},
                {"key": "C", "text": "Isaac Newton"}
            ],
            "answer_key": {"14": "A", "15": "B"},
            "marks": 2
        },
        "ui_component": "MatchingFeatures",
        "auto_grade": True,
        "grading_method": "mapping_match"
    },
    
    "matching_headings": {
        "name": "Matching Headings",
        "description": "Match headings to paragraphs or sections",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "matching_headings"},
            "paragraph_ref": {"type": "string", "required": True},
            "headings": {"type": "array", "required": True},
            "answer_key": {"type": "string", "required": True},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 1,
            "type": "matching_headings",
            "paragraph_ref": "Paragraph A",
            "headings": [
                {"key": "i", "text": "Historical background"},
                {"key": "ii", "text": "Modern applications"},
                {"key": "iii", "text": "Future prospects"}
            ],
            "answer_key": "i",
            "marks": 1
        },
        "ui_component": "MatchingHeadings",
        "auto_grade": True,
        "grading_method": "exact_match"
    },
    
    "matching_sentence_endings": {
        "name": "Matching Sentence Endings",
        "description": "Match sentence beginnings to correct endings",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "matching_sentence_endings"},
            "sentence_beginning": {"type": "string", "required": True},
            "endings": {"type": "array", "required": True},
            "answer_key": {"type": "string", "required": True},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 20,
            "type": "matching_sentence_endings",
            "sentence_beginning": "The research showed that",
            "endings": [
                {"key": "A", "text": "results were inconclusive."},
                {"key": "B", "text": "more funding was needed."},
                {"key": "C", "text": "the hypothesis was correct."}
            ],
            "answer_key": "C",
            "marks": 1
        },
        "ui_component": "MatchingSentenceEndings",
        "auto_grade": True,
        "grading_method": "exact_match"
    },
    
    "multiple_choice_multiple_reading": {
        "name": "Multiple Choice with More Than One Answer",
        "description": "Choose TWO or more correct answers",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "multiple_choice_multiple_reading"},
            "prompt": {"type": "string", "required": True},
            "options": {"type": "array", "required": True, "min_items": 4},
            "answer_key": {"type": "array", "required": True},
            "select_count": {"type": "integer", "required": True},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 18,
            "type": "multiple_choice_multiple_reading",
            "prompt": "Which TWO statements are supported by the text?",
            "options": ["Statement A", "Statement B", "Statement C", "Statement D"],
            "answer_key": ["A", "C"],
            "select_count": 2,
            "marks": 1
        },
        "ui_component": "MultipleChoiceMultiple",
        "auto_grade": True,
        "grading_method": "set_match"
    },
    
    "multiple_choice_single_reading": {
        "name": "Multiple Choice with One Answer",
        "description": "Choose ONE correct answer",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "multiple_choice_single_reading"},
            "prompt": {"type": "string", "required": True},
            "options": {"type": "array", "required": True, "min_items": 3, "max_items": 4},
            "answer_key": {"type": "string", "required": True},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 14,
            "type": "multiple_choice_single_reading",
            "prompt": "What is the main idea of the passage?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer_key": "B",
            "marks": 1
        },
        "ui_component": "MultipleChoiceSingle",
        "auto_grade": True,
        "grading_method": "exact_match"
    },
    
    "note_completion": {
        "name": "Note Completion",
        "description": "Complete notes using words from the passage",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "note_completion"},
            "title": {"type": "string", "required": True},
            "notes": {"type": "array", "required": True},
            "max_words": {"type": "integer", "required": False, "default": 2},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 8,
            "type": "note_completion",
            "title": "Key Points",
            "notes": [
                {"text": "• Discovery year: __BLANK__", "answer_key": "1928", "max_words": 1},
                {"text": "• Location: __BLANK__", "answer_key": "London", "max_words": 1}
            ],
            "marks": 2
        },
        "ui_component": "NoteCompletion",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    "sentence_completion_reading": {
        "name": "Sentence Completion",
        "description": "Complete sentences using words from the passage",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "sentence_completion_reading"},
            "prompt": {"type": "string", "required": True},
            "answer_key": {"type": "string", "required": True},
            "max_words": {"type": "integer", "required": False, "default": 2},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 23,
            "type": "sentence_completion_reading",
            "prompt": "The experiment was conducted over a period of __BLANK__.",
            "answer_key": "six months",
            "max_words": 2,
            "marks": 1
        },
        "ui_component": "SentenceCompletion",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    "summary_completion_list": {
        "name": "Summary Completion (Selecting from a List)",
        "description": "Complete summary by selecting from a word list",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "summary_completion_list"},
            "summary": {"type": "string", "required": True},
            "word_list": {"type": "array", "required": True},
            "blanks": {"type": "array", "required": True},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 33,
            "type": "summary_completion_list",
            "summary": "The __33__ findings were published in 2020.",
            "word_list": ["preliminary", "final", "initial", "conclusive"],
            "blanks": [{"index": 33, "answer_key": "final"}],
            "marks": 1
        },
        "ui_component": "SummaryCompletionList",
        "auto_grade": True,
        "grading_method": "exact_match"
    },
    
    "summary_completion_text": {
        "name": "Summary Completion (Selecting Words from Text)",
        "description": "Complete summary using words from the passage",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "summary_completion_text"},
            "summary": {"type": "string", "required": True},
            "blanks": {"type": "array", "required": True},
            "max_words": {"type": "integer", "required": False, "default": 2},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 35,
            "type": "summary_completion_text",
            "summary": "The study began in __35__ and continued for __36__ years.",
            "blanks": [
                {"index": 35, "answer_key": "1990", "max_words": 1},
                {"index": 36, "answer_key": "five", "max_words": 1}
            ],
            "marks": 2
        },
        "ui_component": "SummaryCompletionText",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    "table_completion_reading": {
        "name": "Table Completion",
        "description": "Complete table using information from the passage",
        "test_type": "reading",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "table_completion_reading"},
            "table_title": {"type": "string", "required": False},
            "headers": {"type": "array", "required": True},
            "rows": {"type": "array", "required": True},
            "max_words": {"type": "integer", "required": False, "default": 3},
            "marks": {"type": "integer", "required": False}
        },
        "example": {
            "index": 30,
            "type": "table_completion_reading",
            "table_title": "Country Data",
            "headers": ["Country", "Population", "Capital"],
            "rows": [
                {"cells": ["France", "__BLANK__", "Paris"], "blank_position": 1, "answer_key": "67 million", "max_words": 2}
            ],
            "marks": 1
        },
        "ui_component": "TableCompletion",
        "auto_grade": True,
        "grading_method": "case_insensitive"
    },
    
    # ============================================
    # WRITING QUESTION TYPES (2 types)
    # ============================================
    
    "writing_task_1": {
        "name": "Writing Task 1",
        "description": "Describe visual information (chart, graph, diagram)",
        "test_type": "writing",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "writing_task_1"},
            "instructions": {"type": "string", "required": True},
            "prompt": {"type": "string", "required": True},
            "chart_image": {"type": "string", "required": False},
            "min_words": {"type": "integer", "required": True, "default": 150},
            "answer_key": {"type": "null", "required": True, "value": None},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 1,
            "type": "writing_task_1",
            "instructions": "You should spend about 20 minutes on this task.",
            "prompt": "The chart shows population changes in three cities.\n\nSummarise the information by selecting and reporting the main features.",
            "chart_image": "https://example.com/chart.png",
            "min_words": 150,
            "answer_key": None,
            "marks": 1
        },
        "ui_component": "WritingTask1",
        "auto_grade": False,
        "grading_method": "manual_only"
    },
    
    "writing_task_2": {
        "name": "Writing Task 2",
        "description": "Write an essay in response to a point of view, argument, or problem",
        "test_type": "writing",
        "structure": {
            "index": {"type": "integer", "required": True},
            "type": {"type": "string", "required": True, "value": "writing_task_2"},
            "instructions": {"type": "string", "required": True},
            "prompt": {"type": "string", "required": True},
            "min_words": {"type": "integer", "required": True, "default": 250},
            "answer_key": {"type": "null", "required": True, "value": None},
            "marks": {"type": "integer", "required": False, "default": 1}
        },
        "example": {
            "index": 2,
            "type": "writing_task_2",
            "instructions": "You should spend about 40 minutes on this task.",
            "prompt": "Some people think that the best way to reduce crime is to give longer prison sentences. Others believe there are better alternative ways.\n\nDiscuss both views and give your opinion.",
            "min_words": 250,
            "answer_key": None,
            "marks": 1
        },
        "ui_component": "WritingTask2",
        "auto_grade": False,
        "grading_method": "manual_only"
    }
}


# ============================================
# HELPER FUNCTIONS
# ============================================

def get_question_type_info(question_type: str) -> Optional[Dict[str, Any]]:
    """Get complete information about a question type"""
    return QUESTION_TYPE_SCHEMAS.get(question_type)


def get_ui_component(question_type: str) -> str:
    """Get the UI component name for a question type"""
    schema = QUESTION_TYPE_SCHEMAS.get(question_type)
    return schema.get("ui_component", "DefaultComponent") if schema else "DefaultComponent"


def get_grading_method(question_type: str) -> str:
    """Get the grading method for a question type"""
    schema = QUESTION_TYPE_SCHEMAS.get(question_type)
    return schema.get("grading_method", "exact_match") if schema else "exact_match"


def is_auto_gradable(question_type: str) -> bool:
    """Check if a question type can be auto-graded"""
    schema = QUESTION_TYPE_SCHEMAS.get(question_type)
    return schema.get("auto_grade", False) if schema else False


def get_test_type(question_type: str) -> Optional[str]:
    """Get the test type (listening, reading, writing) for a question type"""
    schema = QUESTION_TYPE_SCHEMAS.get(question_type)
    return schema.get("test_type") if schema else None


def get_all_question_types() -> List[str]:
    """Get list of all available question types"""
    return list(QUESTION_TYPE_SCHEMAS.keys())


def get_question_types_by_test(test_type: str) -> List[str]:
    """Get all question types for a specific test type"""
    return [
        qt for qt, schema in QUESTION_TYPE_SCHEMAS.items()
        if schema.get("test_type") == test_type
    ]



def detect_question_type(question_data: Dict[str, Any]) -> Optional[str]:
    """
    Auto-detect question type from question data structure
    
    Args:
        question_data: Dictionary containing question fields
        
    Returns:
        Detected question type string or None if cannot detect
    """
    # If type is explicitly provided, use it
    if "type" in question_data:
        q_type = question_data["type"]
        if q_type in QUESTION_TYPE_SCHEMAS:
            return q_type
    
    # Try to detect based on structure
    # Check for wordlist (sentence_completion_wordlist)
    if "wordlist" in question_data and question_data.get("wordlist"):
        return "sentence_completion_wordlist"
    
    # Check for options (multiple choice variants)
    if "options" in question_data and question_data.get("options"):
        options = question_data["options"]
        if isinstance(options, list) and len(options) > 0:
            # TRUE/FALSE/NOT GIVEN
            if "TRUE" in options and "FALSE" in options and "NOT GIVEN" in options:
                return "true_false_not_given"
            # YES/NO/NOT GIVEN
            if "YES" in options and "NO" in options and "NOT GIVEN" in options:
                return "yes_no_not_given"
            # Regular multiple choice
            return "multiple_choice"
    
    # Check for answer_key to determine short answer types
    if "answer_key" in question_data:
        # Could be short_answer, sentence_completion, etc.
        # Default to short_answer_reading if no other indicators
        return "short_answer_reading"
    
    # Default fallback
    return None


def validate_question_structure(question_data: Dict[str, Any], question_type: str) -> tuple[bool, List[str]]:
    """
    Validate question data structure against expected schema
    
    Args:
        question_data: Dictionary containing question fields
        question_type: The question type to validate against
        
    Returns:
        Tuple of (is_valid: bool, errors: List[str])
    """
    errors = []
    
    # Check if question type exists
    if question_type not in QUESTION_TYPE_SCHEMAS:
        return False, [f"Unknown question type: {question_type}"]
    
    schema = QUESTION_TYPE_SCHEMAS[question_type]
    required_fields = schema.get("required_fields", [])
    
    # Check required fields
    for field in required_fields:
        if field not in question_data or not question_data[field]:
            errors.append(f"Missing required field: {field}")
    
    # Validate specific field types
    if "options" in required_fields and "options" in question_data:
        if not isinstance(question_data["options"], list):
            errors.append("Field 'options' must be a list")
    
    if "wordlist" in required_fields and "wordlist" in question_data:
        if not isinstance(question_data["wordlist"], list):
            errors.append("Field 'wordlist' must be a list")
    
    return len(errors) == 0, errors
