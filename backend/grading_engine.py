"""
Enhanced Grading Engine for QTI-Based Question Types
Supports all 24 new question types with flexible grading logic
"""

from typing import Any, Dict, List, Optional
import re


def normalize_text(text: str) -> str:
    """Normalize text for comparison"""
    if not isinstance(text, str):
        text = str(text)
    # Remove extra whitespace, convert to lowercase
    return ' '.join(text.strip().lower().split())


def normalize_answer_list(answers: List[str]) -> List[str]:
    """Normalize list of answers"""
    return sorted([normalize_text(ans) for ans in answers])


def grade_exact_match(student_answer: str, correct_answer: str) -> bool:
    """Exact match grading (case-sensitive for letter options like A, B, C)"""
    if not student_answer or not correct_answer:
        return False
    return str(student_answer).strip().upper() == str(correct_answer).strip().upper()


def grade_case_insensitive(student_answer: str, correct_answer: str) -> bool:
    """Case-insensitive text comparison with whitespace normalization"""
    if not student_answer or not correct_answer:
        return False
    return normalize_text(student_answer) == normalize_text(correct_answer)


def grade_set_match(student_answers: List[str], correct_answers: List[str]) -> bool:
    """Set matching for multiple choice with multiple answers"""
    if not isinstance(student_answers, list) or not isinstance(correct_answers, list):
        return False
    
    # Normalize and compare sets
    student_set = set(normalize_answer_list(student_answers))
    correct_set = set(normalize_answer_list(correct_answers))
    
    return student_set == correct_set


def grade_mapping_match(student_mapping: Dict[str, str], correct_mapping: Dict[str, str]) -> bool:
    """Matching questions - compare key-value mappings"""
    if not isinstance(student_mapping, dict) or not isinstance(correct_mapping, dict):
        return False
    
    # Normalize keys and values
    student_normalized = {
        str(k).strip(): str(v).strip().upper()
        for k, v in student_mapping.items()
    }
    correct_normalized = {
        str(k).strip(): str(v).strip().upper()
        for k, v in correct_mapping.items()
    }
    
    return student_normalized == correct_normalized


def grade_flexible_text(student_answer: str, correct_answer: str, max_words: Optional[int] = None) -> bool:
    """
    Flexible text grading with:
    - Case insensitivity
    - Whitespace normalization
    - Optional word count validation
    - Punctuation tolerance
    """
    if not student_answer or not correct_answer:
        return False
    
    student_clean = normalize_text(student_answer)
    correct_clean = normalize_text(correct_answer)
    
    # Check word count if specified
    if max_words and len(student_clean.split()) > max_words:
        return False
    
    # Accept exact match or partial match with key words
    if student_clean == correct_clean:
        return True
    
    # Check if all correct answer words are in student answer (flexible matching)
    correct_words = set(correct_clean.split())
    student_words = set(student_clean.split())
    
    # At least 70% of correct words must be present
    if len(correct_words) > 0:
        overlap = len(correct_words.intersection(student_words))
        return overlap / len(correct_words) >= 0.7
    
    return False


def grade_question(
    question_type: str,
    student_answer: Any,
    correct_answer: Any,
    question_payload: Optional[Dict[str, Any]] = None
) -> bool:
    """
    Grade a question based on its type
    
    Args:
        question_type: Type of question
        student_answer: Student's answer
        correct_answer: Correct answer
        question_payload: Additional question data (for max_words, etc.)
    
    Returns:
        True if answer is correct, False otherwise
    """
    if not student_answer or correct_answer is None:
        return False
    
    # Get max_words if available
    max_words = question_payload.get("max_words") if question_payload else None
    
    # ============================================
    # LISTENING QUESTION TYPES
    # ============================================
    
    if question_type == "fill_in_gaps":
        return grade_case_insensitive(student_answer, correct_answer)
    
    elif question_type == "fill_in_gaps_short_answers":
        return grade_flexible_text(student_answer, correct_answer, max_words)
    
    elif question_type == "flowchart_completion_listening":
        return grade_flexible_text(student_answer, correct_answer, max_words)
    
    elif question_type == "form_completion":
        return grade_case_insensitive(student_answer, correct_answer)
    
    elif question_type == "map_labeling":
        return grade_exact_match(student_answer, correct_answer)
    
    elif question_type == "matching_listening":
        if isinstance(correct_answer, dict):
            # For matching with multiple items
            return grade_mapping_match(student_answer, correct_answer)
        else:
            # Single matching item
            return grade_exact_match(student_answer, correct_answer)
    
    elif question_type == "multiple_choice_multiple_listening":
        return grade_set_match(student_answer, correct_answer)
    
    elif question_type == "multiple_choice_single_listening":
        return grade_exact_match(student_answer, correct_answer)
    
    elif question_type == "sentence_completion_listening":
        return grade_flexible_text(student_answer, correct_answer, max_words)
    
    elif question_type == "table_completion_listening":
        return grade_case_insensitive(student_answer, correct_answer)
    
    # ============================================
    # READING QUESTION TYPES
    # ============================================
    
    elif question_type == "flowchart_completion_reading":
        return grade_flexible_text(student_answer, correct_answer, max_words)
    
    elif question_type == "true_false_not_given":
        return grade_exact_match(student_answer, correct_answer)
    
    elif question_type == "matching_features":
        if isinstance(correct_answer, dict):
            return grade_mapping_match(student_answer, correct_answer)
        else:
            return grade_exact_match(student_answer, correct_answer)
    
    elif question_type == "matching_headings":
        return grade_exact_match(student_answer, correct_answer)
    
    elif question_type == "matching_sentence_endings":
        return grade_exact_match(student_answer, correct_answer)
    
    elif question_type == "multiple_choice_multiple_reading":
        return grade_set_match(student_answer, correct_answer)
    
    elif question_type == "multiple_choice_single_reading":
        return grade_exact_match(student_answer, correct_answer)
    
    elif question_type == "note_completion":
        return grade_flexible_text(student_answer, correct_answer, max_words)
    
    elif question_type == "sentence_completion_reading":
        return grade_flexible_text(student_answer, correct_answer, max_words)
    
    elif question_type == "summary_completion_list":
        # Exact match from word list
        return grade_exact_match(student_answer, correct_answer)
    
    elif question_type == "summary_completion_text":
        return grade_flexible_text(student_answer, correct_answer, max_words)
    
    elif question_type == "table_completion_reading":
        return grade_flexible_text(student_answer, correct_answer, max_words)
    
    # ============================================
    # WRITING QUESTION TYPES (Manual grading only)
    # ============================================
    
    elif question_type in ["writing_task_1", "writing_task_2"]:
        # Writing tasks are manually graded
        return False
    
    # ============================================
    # LEGACY TYPES (For backward compatibility)
    # ============================================
    
    elif question_type in ["short_answer", "diagram_labeling", "short_answer_reading"]:
        return grade_flexible_text(student_answer, correct_answer, max_words)
    
    elif question_type in ["multiple_choice", "matching_paragraphs"]:
        return grade_exact_match(student_answer, correct_answer)
    
    elif question_type == "yes_no_not_given":
        return grade_exact_match(student_answer, correct_answer)
    
    # Default to case-insensitive comparison
    else:
        return grade_case_insensitive(student_answer, correct_answer)


def grade_submission(
    questions: List[Dict[str, Any]],
    student_answers: Dict[str, Any],
    exam_type: Optional[str] = None
) -> Dict[str, Any]:
    """
    Grade an entire submission
    
    Args:
        questions: List of question objects with type, payload, and answer_key
        student_answers: Dictionary mapping question index to student answer
        exam_type: Type of exam (listening, reading, writing)
    
    Returns:
        Dictionary with score, total_questions, correct_answers, and detailed results
    """
    
    # Skip grading for writing tests
    if exam_type == "writing":
        return {
            "score": 0,
            "total_questions": len(questions),
            "correct_answers": 0,
            "detailed_results": {},
            "auto_graded": False
        }
    
    correct_count = 0
    detailed_results = {}
    
    for question in questions:
        question_index = str(question["index"])
        question_type = question["type"]
        payload = question.get("payload", {})
        
        # Get correct answer from payload
        correct_answer = payload.get("answer_key")
        if correct_answer is None:
            # Skip questions without answer keys (e.g., writing tasks)
            detailed_results[question_index] = {
                "is_correct": None,
                "grading_method": "manual_only"
            }
            continue
        
        # Get student answer
        student_answer = student_answers.get(question_index)
        
        # Grade the question
        is_correct = grade_question(
            question_type=question_type,
            student_answer=student_answer,
            correct_answer=correct_answer,
            question_payload=payload
        )
        
        if is_correct:
            correct_count += 1
        
        detailed_results[question_index] = {
            "is_correct": is_correct,
            "student_answer": student_answer,
            "correct_answer": correct_answer,
            "question_type": question_type
        }
    
    total_questions = len(questions)
    
    return {
        "score": correct_count,
        "total_questions": total_questions,
        "correct_answers": correct_count,
        "detailed_results": detailed_results,
        "auto_graded": True
    }
