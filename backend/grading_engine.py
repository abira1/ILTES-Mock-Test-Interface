"""
Grading Engine for IELTS Exam System
Handles automatic grading of student submissions for all question types
"""

from typing import List, Dict, Any, Optional
from new_question_type_schemas import get_grading_method, is_auto_gradable
import re


def normalize_answer(answer: str) -> str:
    """Normalize answer for comparison"""
    if not answer:
        return ""
    # Convert to lowercase and strip whitespace
    normalized = str(answer).lower().strip()
    # Remove extra spaces
    normalized = re.sub(r'\s+', ' ', normalized)
    return normalized


def check_answer_match(student_answer: str, correct_answer: str, question_type: str) -> bool:
    """
    Check if student answer matches correct answer based on question type
    
    Args:
        student_answer: The answer provided by student
        correct_answer: The correct answer key
        question_type: Type of question
        
    Returns:
        bool: True if answer is correct, False otherwise
    """
    # Normalize both answers
    student_norm = normalize_answer(student_answer)
    correct_norm = normalize_answer(correct_answer)
    
    if not student_norm:
        return False
    
    # For multiple choice, matching, etc. - exact match after normalization
    if question_type in [
        "multiple_choice", "matching_headings", "matching_information",
        "matching_features", "matching_sentence_endings", "matching_names",
        "true_false_not_given", "yes_no_not_given", "diagram_labeling",
        "multiple_choice_multiple_answers"
    ]:
        return student_norm == correct_norm
    
    # For short answer and sentence completion - allow flexible matching
    if question_type in [
        "short_answer_reading", "short_answer_listening",
        "sentence_completion", "sentence_completion_wordlist",
        "note_completion", "flow_chart_completion",
        "table_completion", "summary_completion"
    ]:
        # Check if student answer contains the correct answer or vice versa
        # This allows for minor variations
        return correct_norm in student_norm or student_norm in correct_norm
    
    # For fill in gaps and form completion - exact match
    if question_type in [
        "fill_in_gaps", "form_completion", "plan_map_diagram_labeling"
    ]:
        return student_norm == correct_norm
    
    # Default: exact match
    return student_norm == correct_norm


def grade_submission(
    questions: List[Dict[str, Any]],
    student_answers: Dict[str, str],
    exam_type: Optional[str] = None
) -> Dict[str, Any]:
    """
    Grade a student submission
    
    Args:
        questions: List of question dictionaries
        student_answers: Dict mapping question_id to student's answer
        exam_type: Type of exam (listening, reading, writing, speaking)
        
    Returns:
        Dict containing:
            - score: Total score (0-9 for IELTS scale)
            - correct_answers: Number of correct answers
            - total_questions: Total number of gradable questions
            - details: List of per-question results
    """
    results = []
    correct_count = 0
    total_gradable = 0
    
    for question in questions:
        question_id = question.get("id", "")
        question_type = question.get("type", "")
        answer_key = question.get("answer_key", "")
        
        # Check if question is auto-gradable
        if not is_auto_gradable(question_type):
            # Skip writing and speaking questions
            results.append({
                "question_id": question_id,
                "type": question_type,
                "is_correct": None,
                "student_answer": student_answers.get(question_id, ""),
                "correct_answer": answer_key,
                "requires_manual_grading": True
            })
            continue
        
        total_gradable += 1
        student_answer = student_answers.get(question_id, "")
        
        # Check if answer is correct
        is_correct = check_answer_match(student_answer, answer_key, question_type)
        
        if is_correct:
            correct_count += 1
        
        results.append({
            "question_id": question_id,
            "type": question_type,
            "is_correct": is_correct,
            "student_answer": student_answer,
            "correct_answer": answer_key,
            "requires_manual_grading": False
        })
    
    # Calculate IELTS band score based on percentage
    # This is a simplified conversion - real IELTS has specific conversion tables
    if total_gradable > 0:
        percentage = (correct_count / total_gradable) * 100
        
        # Convert percentage to IELTS band (0-9)
        if percentage >= 90:
            band_score = 9.0
        elif percentage >= 85:
            band_score = 8.5
        elif percentage >= 80:
            band_score = 8.0
        elif percentage >= 75:
            band_score = 7.5
        elif percentage >= 70:
            band_score = 7.0
        elif percentage >= 65:
            band_score = 6.5
        elif percentage >= 60:
            band_score = 6.0
        elif percentage >= 55:
            band_score = 5.5
        elif percentage >= 50:
            band_score = 5.0
        elif percentage >= 40:
            band_score = 4.5
        elif percentage >= 30:
            band_score = 4.0
        elif percentage >= 20:
            band_score = 3.5
        elif percentage >= 10:
            band_score = 3.0
        else:
            band_score = 2.5
    else:
        band_score = 0.0
    
    return {
        "score": band_score,
        "correct_answers": correct_count,
        "total_questions": total_gradable,
        "details": results,
        "percentage": round((correct_count / total_gradable * 100) if total_gradable > 0 else 0, 2)
    }
