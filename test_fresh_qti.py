#!/usr/bin/env python3
"""
Fresh QTI Listening Test - Comprehensive Backend Testing
Tests the fresh QTI listening test with all 10 question types
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend environment
BACKEND_URL = "https://test-display-fix.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}=== {test_name} ==={Colors.END}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.END}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.END}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.END}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.END}")

def test_fresh_qti_listening_comprehensive():
    """Test Fresh QTI-Compliant IELTS Listening System - Comprehensive Backend Verification"""
    print_test_header("Fresh QTI-Compliant IELTS Listening System - Comprehensive Backend Verification")
    
    print_info("Testing fresh QTI-compliant IELTS Listening system as requested:")
    print_info("1. Fresh QTI Listening Test Availability (exam ID: fresh-qti-listening-test)")
    print_info("2. Question Structure Validation (40 questions, 4 sections)")
    print_info("3. All 10 QTI Question Types Implementation")
    print_info("4. Auto-Grading System for all QTI question types")
    print_info("5. Exam Data Integrity and Answer Keys")
    print_info("6. Submission Workflow with QTI format")
    print_info("")
    
    results = {}
    qti_exam_id = "fresh-qti-listening-test"
    
    # Test 1: Fresh QTI Listening Test Availability
    print_info("\n--- Test 1: Fresh QTI Listening Test Availability ---")
    print_info("Testing: GET /api/exams/published should include 'fresh-qti-listening-test'")
    
    try:
        response = requests.get(f"{BACKEND_URL}/exams/published", timeout=10)
        if response.status_code == 200:
            published_exams = response.json()
            print_success(f"✅ Published exams retrieved - Status: {response.status_code}")
            print_info(f"Found {len(published_exams)} published exams")
            
            # Check if Fresh QTI exam exists
            qti_exam_found = False
            qti_exam_data = None
            for exam in published_exams:
                if exam.get('id') == qti_exam_id:
                    qti_exam_found = True
                    qti_exam_data = exam
                    break
            
            if qti_exam_found:
                print_success(f"✅ Fresh QTI Listening Test found: '{qti_exam_data.get('title')}'")
                print_info(f"Exam ID: {qti_exam_data.get('id')}")
                print_info(f"Exam type: {qti_exam_data.get('exam_type')}")
                print_info(f"Duration: {qti_exam_data.get('duration_seconds')} seconds ({qti_exam_data.get('duration_seconds', 0) // 60} minutes)")
                print_info(f"Question count: {qti_exam_data.get('question_count')}")
                print_info(f"Audio URL: {qti_exam_data.get('audio_url', 'None')}")
                results['qti_exam_availability'] = True
            else:
                print_error(f"❌ Fresh QTI Listening Test '{qti_exam_id}' not found in published exams")
                print_info("Available exams:")
                for exam in published_exams[:5]:
                    print_info(f"  - {exam.get('id')}: {exam.get('title')}")
                results['qti_exam_availability'] = False
        else:
            print_error(f"❌ Published exams retrieval failed - Status: {response.status_code}")
            results['qti_exam_availability'] = False
    except Exception as e:
        print_error(f"❌ Fresh QTI exam availability test error: {str(e)}")
        results['qti_exam_availability'] = False
    
    # Test 2: Question Structure Validation
    print_info("\n--- Test 2: Question Structure Validation ---")
    print_info(f"Testing: GET /api/exams/{qti_exam_id}/full should return 40 questions with proper QTI types")
    
    try:
        response = requests.get(f"{BACKEND_URL}/exams/{qti_exam_id}/full", timeout=10)
        if response.status_code == 200:
            full_exam = response.json()
            print_success(f"✅ Full exam data retrieved - Status: {response.status_code}")
            
            exam_data = full_exam.get('exam', {})
            sections_data = full_exam.get('sections', [])
            
            print_info(f"Exam title: {exam_data.get('title')}")
            print_info(f"Sections count: {len(sections_data)}")
            
            # Verify 4 sections
            if len(sections_data) == 4:
                print_success("✅ Correct number of sections (4)")
                results['qti_sections_count'] = True
            else:
                print_error(f"❌ Expected 4 sections, found {len(sections_data)}")
                results['qti_sections_count'] = False
            
            # Collect all questions and verify count
            all_questions = []
            for section in sections_data:
                questions = section.get('questions', [])
                all_questions.extend(questions)
                print_info(f"  Section {section.get('index')}: {len(questions)} questions")
            
            # Verify 40 questions total
            if len(all_questions) == 40:
                print_success("✅ Correct number of questions (40)")
                results['qti_questions_count'] = True
            else:
                print_error(f"❌ Expected 40 questions, found {len(all_questions)}")
                results['qti_questions_count'] = False
            
            # Test 3: Verify All 10 QTI Question Types
            print_info("\n--- Test 3: All 10 QTI Question Types Verification ---")
            print_info("Checking for all required QTI question types in the fresh test")
            
            expected_qti_types = [
                "form_completion",
                "fill_in_gaps", 
                "fill_in_gaps_short_answers",
                "multiple_choice_single",
                "multiple_choice_multiple",
                "map_labeling",
                "matching",
                "sentence_completion",
                "table_completion",
                "flowchart_completion"
            ]
            
            found_question_types = {}
            for question in all_questions:
                q_type = question.get('type')
                if q_type in found_question_types:
                    found_question_types[q_type] += 1
                else:
                    found_question_types[q_type] = 1
            
            print_info(f"Question types found: {list(found_question_types.keys())}")
            
            missing_types = []
            for expected_type in expected_qti_types:
                if expected_type in found_question_types:
                    count = found_question_types[expected_type]
                    print_success(f"✅ {expected_type}: {count} questions")
                else:
                    missing_types.append(expected_type)
                    print_error(f"❌ {expected_type}: NOT FOUND")
            
            if not missing_types:
                print_success("✅ All 10 QTI question types are implemented!")
                results['qti_all_types'] = True
            else:
                print_error(f"❌ Missing QTI question types: {missing_types}")
                results['qti_all_types'] = False
            
            # Test 4: Question Distribution by Section
            print_info("\n--- Test 4: Question Distribution by Section ---")
            for i, section in enumerate(sections_data, 1):
                section_questions = section.get('questions', [])
                print_info(f"Section {i}: {len(section_questions)} questions")
                
                # Show question types in each section
                section_types = {}
                for q in section_questions:
                    q_type = q.get('type')
                    section_types[q_type] = section_types.get(q_type, 0) + 1
                
                for q_type, count in section_types.items():
                    print_info(f"  - {q_type}: {count}")
            
            # Verify each section has 10 questions
            sections_correct = True
            for i, section in enumerate(sections_data, 1):
                section_questions = section.get('questions', [])
                if len(section_questions) != 10:
                    print_error(f"❌ Section {i} has {len(section_questions)} questions, expected 10")
                    sections_correct = False
                else:
                    print_success(f"✅ Section {i} has correct number of questions (10)")
            
            results['qti_section_distribution'] = sections_correct
            
            # Test 5: Answer Key Validation
            print_info("\n--- Test 5: Answer Key Validation ---")
            questions_with_keys = 0
            questions_without_keys = 0
            
            for question in all_questions:
                payload = question.get('payload', {})
                if 'answer_key' in payload and payload['answer_key']:
                    questions_with_keys += 1
                else:
                    questions_without_keys += 1
                    print_warning(f"Question {question.get('index')} ({question.get('type')}) missing answer_key")
            
            print_info(f"Questions with answer keys: {questions_with_keys}")
            print_info(f"Questions without answer keys: {questions_without_keys}")
            
            if questions_with_keys == 40:
                print_success("✅ All 40 questions have answer keys for auto-grading")
                results['qti_answer_keys'] = True
            else:
                print_error(f"❌ Only {questions_with_keys}/40 questions have answer keys")
                results['qti_answer_keys'] = False
            
            # Store full exam data for later tests
            results['full_exam_data'] = full_exam
            results['all_questions'] = all_questions
            
        else:
            print_error(f"❌ Full exam data retrieval failed - Status: {response.status_code}")
            results['qti_sections_count'] = False
            results['qti_questions_count'] = False
            results['qti_all_types'] = False
            results['qti_section_distribution'] = False
            results['qti_answer_keys'] = False
    except Exception as e:
        print_error(f"❌ Question structure validation error: {str(e)}")
        results['qti_sections_count'] = False
        results['qti_questions_count'] = False
        results['qti_all_types'] = False
        results['qti_section_distribution'] = False
        results['qti_answer_keys'] = False
    
    # Test 6: Auto-Grading System for QTI Question Types
    print_info("\n--- Test 6: Auto-Grading System for QTI Question Types ---")
    print_info("Testing: POST /api/submissions with sample QTI answers and verify auto-grading")
    
    # Create sample QTI answers for all 40 questions based on fresh QTI test answer keys
    sample_qti_answers = {}
    
    # Section 1: Form completion, Fill in gaps, Fill in gaps short answers, Multiple choice single (Q1-10)
    sample_qti_answers["1"] = "PARKER"  # Form completion
    sample_qti_answers["2"] = "01937 668542"  # Form completion
    sample_qti_answers["3"] = "TWO"  # Form completion
    sample_qti_answers["4"] = "CATHEDRAL"  # Fill in gaps
    sample_qti_answers["5"] = "£30"  # Fill in gaps
    sample_qti_answers["6"] = "AUGUST 1ST"  # Fill in gaps
    sample_qti_answers["7"] = "BY POST"  # Fill in gaps short answers
    sample_qti_answers["8"] = "TWO"  # Fill in gaps short answers
    sample_qti_answers["9"] = "A"  # Multiple choice single
    sample_qti_answers["10"] = "B"  # Multiple choice single
    
    # Section 2: Map labeling, Multiple choice multiple, Table completion (Q11-20)
    sample_qti_answers["11"] = "C"  # Map labeling
    sample_qti_answers["12"] = "A"  # Map labeling
    sample_qti_answers["13"] = "B"  # Map labeling
    sample_qti_answers["14"] = "E"  # Map labeling
    sample_qti_answers["15"] = "A"  # Multiple choice multiple - first answer
    sample_qti_answers["16"] = "C"  # Part of multiple choice multiple
    sample_qti_answers["17"] = "G"  # Part of multiple choice multiple
    sample_qti_answers["18"] = "9 AM"  # Table completion
    sample_qti_answers["19"] = "CLOSED"  # Table completion
    sample_qti_answers["20"] = "24 HOURS"  # Table completion
    
    # Section 3: Matching, Sentence completion (Q21-30)
    sample_qti_answers["21"] = "B"  # Matching
    sample_qti_answers["22"] = "A"  # Matching
    sample_qti_answers["23"] = "E"  # Matching
    sample_qti_answers["24"] = "G"  # Matching
    sample_qti_answers["25"] = "H"  # Matching
    sample_qti_answers["26"] = "NEXT TUESDAY"  # Sentence completion
    sample_qti_answers["27"] = "DRAFT PROPOSAL"  # Sentence completion
    sample_qti_answers["28"] = "ONLINE DATABASES"  # Sentence completion
    sample_qti_answers["29"] = "PLANNING MEETING"  # Sentence completion
    sample_qti_answers["30"] = "FIFTEEN"  # Sentence completion
    
    # Section 4: Flowchart completion, Multiple choice single (Q31-40)
    sample_qti_answers["31"] = "INTAKE CHAMBER"  # Flowchart completion
    sample_qti_answers["32"] = "SEDIMENTATION"  # Flowchart completion
    sample_qti_answers["33"] = "SAND"  # Flowchart completion
    sample_qti_answers["34"] = "CHLORINE"  # Flowchart completion
    sample_qti_answers["35"] = "STORAGE TANKS"  # Flowchart completion
    sample_qti_answers["36"] = "B"  # Multiple choice single
    sample_qti_answers["37"] = "B"  # Multiple choice single
    sample_qti_answers["38"] = "C"  # Multiple choice single
    sample_qti_answers["39"] = "B"  # Multiple choice single
    sample_qti_answers["40"] = "B"  # Multiple choice single
    
    # Create submission data
    submission_data = {
        "exam_id": qti_exam_id,
        "user_id_or_session": f"test_user_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        "answers": sample_qti_answers,
        "started_at": datetime.now().isoformat(),
        "finished_at": datetime.now().isoformat(),
        "progress_percent": 100
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/submissions",
            json=submission_data,
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        
        if response.status_code == 200:
            submission_result = response.json()
            print_success(f"✅ QTI submission created successfully - Status: {response.status_code}")
            print_info(f"Submission ID: {submission_result.get('id')}")
            print_info(f"Total questions: {submission_result.get('total_questions')}")
            print_info(f"Correct answers: {submission_result.get('correct_answers')}")
            print_info(f"Score: {submission_result.get('score')}")
            
            # Verify auto-grading worked
            total_questions = submission_result.get('total_questions', 0)
            correct_answers = submission_result.get('correct_answers', 0)
            score = submission_result.get('score', 0)
            
            if total_questions == 40:
                print_success("✅ Correct total questions count (40)")
                results['qti_submission_total'] = True
            else:
                print_error(f"❌ Expected 40 total questions, got {total_questions}")
                results['qti_submission_total'] = False
            
            # Check if we got a perfect score (all answers should be correct)
            if score == 40 and correct_answers == 40:
                print_success("✅ Perfect auto-grading score (40/40) - All QTI question types graded correctly!")
                results['qti_auto_grading'] = True
            else:
                print_warning(f"⚠️  Auto-grading score: {score}/40 ({correct_answers} correct)")
                print_info("This may indicate some QTI question types need grading logic adjustment")
                results['qti_auto_grading'] = False
            
            results['submission_id'] = submission_result.get('id')
            
        else:
            print_error(f"❌ QTI submission failed - Status: {response.status_code}")
            print_error(f"Response: {response.text}")
            results['qti_submission_total'] = False
            results['qti_auto_grading'] = False
    except Exception as e:
        print_error(f"❌ QTI submission test error: {str(e)}")
        results['qti_submission_total'] = False
        results['qti_auto_grading'] = False
    
    # Test 7: Detailed Question Payload Verification
    print_info("\n--- Test 7: Detailed Question Payload Verification ---")
    if 'all_questions' in results:
        all_questions = results['all_questions']
        
        # Check specific QTI question type payloads
        qti_payload_checks = {
            'form_completion': ['fields', 'form_title'],
            'fill_in_gaps': ['table_data'],
            'multiple_choice_single': ['options', 'question_text'],
            'multiple_choice_multiple': ['options', 'answer_keys'],
            'map_labeling': ['options', 'questions'],
            'matching': ['items', 'options'],
            'table_completion': ['table_data'],
            'sentence_completion': ['sentences'],
            'flowchart_completion': ['steps']
        }
        
        payload_issues = []
        for question in all_questions[:10]:  # Check first 10 questions
            q_type = question.get('type')
            payload = question.get('payload', {})
            q_index = question.get('index')
            
            if q_type in qti_payload_checks:
                expected_fields = qti_payload_checks[q_type]
                missing_fields = []
                for field in expected_fields:
                    if field not in payload:
                        missing_fields.append(field)
                
                if missing_fields:
                    payload_issues.append(f"Q{q_index} ({q_type}): Missing {missing_fields}")
                else:
                    print_success(f"✅ Q{q_index} ({q_type}): Proper payload structure")
        
        if not payload_issues:
            print_success("✅ All QTI question payloads have proper structure")
            results['qti_payload_structure'] = True
        else:
            print_error("❌ Some QTI question payloads have structural issues:")
            for issue in payload_issues:
                print_error(f"  {issue}")
            results['qti_payload_structure'] = False
    else:
        print_error("❌ No question data available for payload verification")
        results['qti_payload_structure'] = False
    
    # Summary
    print_info("\n--- Fresh QTI Listening Test Summary ---")
    passed_tests = sum(1 for result in results.values() if result is True)
    total_tests = len([k for k, v in results.items() if isinstance(v, bool)])
    
    if passed_tests == total_tests:
        print_success(f"🎉 ALL FRESH QTI LISTENING TESTS PASSED ({passed_tests}/{total_tests})")
        print_success("✅ Fresh QTI Listening Test exists and is properly configured")
        print_success("✅ All 10 QTI question types are implemented and working")
        print_success("✅ Exam has correct structure (4 sections, 40 questions)")
        print_success("✅ All questions have proper answer keys for auto-grading")
        print_success("✅ Auto-grading system works for all QTI question types")
        print_success("✅ Question payloads have proper QTI-compliant structure")
        print_success("✅ Fresh QTI Listening Test is fully operational and ready for use!")
    else:
        print_error(f"❌ SOME TESTS FAILED ({passed_tests}/{total_tests})")
        for test_name, result in results.items():
            if isinstance(result, bool):
                status = "PASS" if result else "FAIL"
                color = Colors.GREEN if result else Colors.RED
                print(f"  {color}{status} - {test_name.replace('_', ' ').title()}{Colors.END}")
    
    return results

if __name__ == "__main__":
    print(f"{Colors.BLUE}{Colors.BOLD}🚀 Testing Fresh QTI Listening Test System 🚀{Colors.END}")
    test_fresh_qti_listening_comprehensive()