"""
Comprehensive IELTS Practice Test
==================================
This test includes 40 questions across 4 sections demonstrating all question types:
- Section 1: Listening (10 questions)
- Section 2: Reading (10 questions)
- Section 3: Writing (10 questions)
- Section 4: Mixed - All Question Types (10 questions)
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

COMPREHENSIVE_EXAM_ID = "comprehensive-ielts-practice-test"

async def init_comprehensive_test():
    """Initialize the comprehensive IELTS practice test with all question types"""
    
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'ielts_test_db')]
    
    # Check if test already exists
    existing = await db.exams.find_one({"id": COMPREHENSIVE_EXAM_ID})
    if existing:
        print(f"Comprehensive test already exists with ID: {COMPREHENSIVE_EXAM_ID}")
        return COMPREHENSIVE_EXAM_ID
    
    # Create exam document
    now = datetime.utcnow().isoformat()
    exam = {
        "id": COMPREHENSIVE_EXAM_ID,
        "title": "Comprehensive IELTS Practice Test - All Question Types",
        "description": "A complete practice test with 40 questions covering all question types across Listening, Reading, Writing, and Mixed sections",
        "exam_type": "comprehensive",
        "duration_seconds": 7200,  # 120 minutes (2 hours)
        "question_count": 40,
        "published": True,
        "is_active": False,
        "started_at": None,
        "stopped_at": None,
        "audio_url": "https://audio.jukehost.co.uk/F9irt6LcsYuP93ulaMo42JfXBEcABytV",  # Sample audio
        "created_at": now,
        "updated_at": now,
        "submission_count": 0
    }
    
    await db.exams.insert_one(exam)
    
    # Create 4 sections
    sections = []
    now_str = datetime.utcnow().isoformat()
    
    # SECTION 1: LISTENING (Questions 1-10)
    section1 = {
        "exam_id": COMPREHENSIVE_EXAM_ID,
        "index": 1,
        "title": "Section 1 - Listening",
        "type": "listening",
        "instructions": "Listen to the audio and answer questions 1-10. You will hear a conversation and various listening scenarios.",
        "passage_text": None,
        "created_at": now_str
    }
    result1 = await db.sections.insert_one(section1)
    section1_id = str(result1.inserted_id)
    
    # SECTION 2: READING (Questions 11-20)
    section2 = {
        "exam_id": COMPREHENSIVE_EXAM_ID,
        "index": 2,
        "title": "Section 2 - Reading",
        "type": "reading",
        "instructions": "Read the passage carefully and answer questions 11-20.",
        "passage_text": """Climate Change and Global Agriculture

Climate change poses significant challenges to global food security. Rising temperatures, changing precipitation patterns, and increased frequency of extreme weather events are already affecting agricultural productivity worldwide. Scientists predict that by 2050, crop yields could decline by up to 25% in some regions if current trends continue.

However, adaptation strategies offer hope. Farmers are implementing water-efficient irrigation systems, developing drought-resistant crop varieties, and adopting sustainable farming practices. Precision agriculture, which uses technology to optimize crop management, is becoming increasingly important. These innovations help maximize yields while minimizing environmental impact.

The role of policy cannot be overstated. Governments must invest in agricultural research, provide support for farmers transitioning to climate-resilient practices, and promote international cooperation on food security issues. Only through coordinated global action can we ensure adequate food supplies for future generations.""",
        "created_at": now_str
    }
    result2 = await db.sections.insert_one(section2)
    section2_id = str(result2.inserted_id)
    
    # SECTION 3: WRITING (Questions 21-30)
    section3 = {
        "exam_id": COMPREHENSIVE_EXAM_ID,
        "index": 3,
        "title": "Section 3 - Writing",
        "type": "writing",
        "instructions": "Complete the writing tasks and answer the following questions.",
        "passage_text": None,
        "created_at": now_str
    }
    result3 = await db.sections.insert_one(section3)
    section3_id = str(result3.inserted_id)
    
    # SECTION 4: MIXED - ALL TYPES (Questions 31-40)
    section4 = {
        "exam_id": COMPREHENSIVE_EXAM_ID,
        "index": 4,
        "title": "Section 4 - Mixed Question Types",
        "type": "mixed",
        "instructions": "This section contains a variety of question types. Read each question carefully and provide your answer.",
        "passage_text": """Artificial Intelligence in Healthcare

Artificial intelligence (AI) is revolutionizing healthcare delivery. Machine learning algorithms can now analyze medical images with accuracy rivaling human experts. AI-powered diagnostic tools help doctors identify diseases earlier, improving treatment outcomes and saving lives.

Despite these advances, challenges remain. Data privacy concerns, algorithmic bias, and the need for human oversight are critical issues that must be addressed. The integration of AI into healthcare requires careful ethical consideration and robust regulatory frameworks.""",
        "created_at": now_str
    }
    result4 = await db.sections.insert_one(section4)
    section4_id = str(result4.inserted_id)
    
    # ==================== SECTION 1: LISTENING QUESTIONS (1-10) ====================
    
    listening_questions = [
        # Q1-2: Fill in Gaps (form_completion)
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section1_id,
            "index": 1,
            "type": "form_completion",
            "payload": {
                "prompt": "Complete the form below. Write NO MORE THAN TWO WORDS for each answer.",
                "form_fields": [
                    {"label": "Name", "blank_id": "1", "answer_key": "Sarah Johnson"},
                    {"label": "Occupation", "blank_id": "2", "answer_key": "teacher"}
                ],
                "answer_key": {"1": "Sarah Johnson", "2": "teacher"}
            },
            "created_at": now_str
        },
        # Q3-4: Multiple Choice Single
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section1_id,
            "index": 3,
            "type": "multiple_choice_single_listening",
            "payload": {
                "prompt": "What is the main topic of the conversation?",
                "options": [
                    "Planning a holiday",
                    "Discussing work schedules",
                    "Booking a hotel room",
                    "Organizing a conference"
                ],
                "answer_key": "C"
            },
            "created_at": now_str
        },
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section1_id,
            "index": 4,
            "type": "multiple_choice_single_listening",
            "payload": {
                "prompt": "When will the meeting take place?",
                "options": [
                    "Monday morning",
                    "Tuesday afternoon",
                    "Wednesday evening",
                    "Friday morning"
                ],
                "answer_key": "B"
            },
            "created_at": now_str
        },
        # Q5-6: Multiple Choice Multiple
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section1_id,
            "index": 5,
            "type": "multiple_choice_multiple_listening",
            "payload": {
                "prompt": "Which TWO facilities are mentioned? Choose TWO letters.",
                "options": [
                    "Swimming pool",
                    "Gym",
                    "Restaurant",
                    "Library",
                    "Cinema"
                ],
                "max_selections": 2,
                "answer_key": ["A", "C"]
            },
            "created_at": now_str
        },
        # Q7-8: Sentence Completion
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section1_id,
            "index": 7,
            "type": "sentence_completion_listening",
            "payload": {
                "sentences": [
                    {"text": "The course begins in ____.", "blank_id": "7", "answer_key": "September"},
                    {"text": "The fee includes all ____.", "blank_id": "8", "answer_key": "materials"}
                ],
                "answer_key": {"7": "September", "8": "materials"}
            },
            "created_at": now_str
        },
        # Q9: Table Completion
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section1_id,
            "index": 9,
            "type": "table_completion_listening",
            "payload": {
                "prompt": "Complete the table below. Write NO MORE THAN TWO WORDS.",
                "table_data": {
                    "headers": ["Day", "Activity", "Time"],
                    "rows": [
                        ["Monday", "__BLANK_9__", "10:00 AM"]
                    ]
                },
                "blanks": [
                    {"blank_id": "9", "answer_key": "Yoga class"}
                ],
                "answer_key": {"9": "Yoga class"}
            },
            "created_at": now_str
        },
        # Q10: Matching
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section1_id,
            "index": 10,
            "type": "matching_listening",
            "payload": {
                "prompt": "Match each person with their role.",
                "items": ["Dr. Smith"],
                "options": [
                    "Manager",
                    "Director",
                    "Consultant",
                    "Supervisor"
                ],
                "answer_key": {"Dr. Smith": "C"}
            },
            "created_at": now_str
        }
    ]
    
    # ==================== SECTION 2: READING QUESTIONS (11-20) ====================
    
    reading_questions = [
        # Q11-12: True/False/Not Given
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section2_id,
            "index": 11,
            "type": "true_false_not_given",
            "payload": {
                "prompt": "Climate change is affecting agricultural productivity worldwide.",
                "answer_key": "TRUE"
            },
            "created_at": now_str
        },
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section2_id,
            "index": 12,
            "type": "true_false_not_given",
            "payload": {
                "prompt": "All regions will experience a 25% decline in crop yields by 2050.",
                "answer_key": "FALSE"
            },
            "created_at": now_str
        },
        # Q13-14: Multiple Choice Single
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section2_id,
            "index": 13,
            "type": "multiple_choice_single_reading",
            "payload": {
                "prompt": "What is the main purpose of precision agriculture?",
                "options": [
                    "To increase farm size",
                    "To optimize crop management using technology",
                    "To reduce labor costs",
                    "To eliminate the need for irrigation"
                ],
                "answer_key": "B"
            },
            "created_at": now_str
        },
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section2_id,
            "index": 14,
            "type": "multiple_choice_single_reading",
            "payload": {
                "prompt": "According to the passage, what role do governments play?",
                "options": [
                    "They provide weather forecasts",
                    "They manufacture agricultural equipment",
                    "They invest in research and support farmers",
                    "They control crop prices"
                ],
                "answer_key": "C"
            },
            "created_at": now_str
        },
        # Q15-16: Matching Headings
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section2_id,
            "index": 15,
            "type": "matching_headings",
            "payload": {
                "prompt": "Choose the correct heading for paragraph 1.",
                "options": [
                    "The challenges of climate change to agriculture",
                    "Future technological solutions",
                    "Government policies worldwide",
                    "Historical farming methods"
                ],
                "answer_key": "A"
            },
            "created_at": now_str
        },
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section2_id,
            "index": 16,
            "type": "matching_headings",
            "payload": {
                "prompt": "Choose the correct heading for paragraph 2.",
                "options": [
                    "Climate change impacts",
                    "Adaptation strategies and innovations",
                    "Policy recommendations",
                    "Economic consequences"
                ],
                "answer_key": "B"
            },
            "created_at": now_str
        },
        # Q17-18: Sentence Completion
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section2_id,
            "index": 17,
            "type": "sentence_completion_reading",
            "payload": {
                "prompt": "Complete the sentence below. Choose NO MORE THAN THREE WORDS from the passage.",
                "sentence": "Farmers are developing crop varieties that are resistant to ____.",
                "answer_key": "drought"
            },
            "created_at": now_str
        },
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section2_id,
            "index": 18,
            "type": "sentence_completion_reading",
            "payload": {
                "prompt": "Complete the sentence below. Choose NO MORE THAN THREE WORDS from the passage.",
                "sentence": "Coordinated ____ is necessary to ensure future food supplies.",
                "answer_key": "global action"
            },
            "created_at": now_str
        },
        # Q19-20: Summary Completion
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section2_id,
            "index": 19,
            "type": "summary_completion_list",
            "payload": {
                "prompt": "Complete the summary using words from the box.",
                "summary_text": "Climate change threatens food security through rising temperatures and changing __19__ patterns. However, __20__ strategies offer solutions.",
                "word_list": ["precipitation", "adaptation", "population", "migration", "technology", "economic"],
                "blanks": [
                    {"blank_id": "19", "answer_key": "precipitation"},
                    {"blank_id": "20", "answer_key": "adaptation"}
                ],
                "answer_key": {"19": "precipitation", "20": "adaptation"}
            },
            "created_at": now_str
        }
    ]
    
    # ==================== SECTION 3: WRITING QUESTIONS (21-30) ====================
    
    writing_questions = [
        # Q21: Writing Task 1
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section3_id,
            "index": 21,
            "type": "writing_task",
            "payload": {
                "instructions": "You should spend about 20 minutes on this task.",
                "prompt": "The chart below shows the percentage of households with internet access in three countries from 2010 to 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
                "chart_image": "https://via.placeholder.com/600x400/4A90E2/FFFFFF?text=Internet+Access+Chart",
                "min_words": 150,
                "task_number": 1,
                "answer_key": None
            },
            "created_at": now_str
        },
        # Q22: Writing Task 2
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section3_id,
            "index": 22,
            "type": "writing_task",
            "payload": {
                "instructions": "You should spend about 40 minutes on this task.",
                "prompt": "Some people believe that technology has made our lives more complicated. Others think it has made our lives easier. Discuss both views and give your own opinion.",
                "chart_image": None,
                "min_words": 250,
                "task_number": 2,
                "answer_key": None
            },
            "created_at": now_str
        },
        # Q23-24: Note Completion (related to writing context)
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section3_id,
            "index": 23,
            "type": "note_completion",
            "payload": {
                "prompt": "Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.",
                "notes_text": "Essay Structure:\n- Introduction: State the __23__\n- Body: Discuss both views\n- Conclusion: Give personal __24__",
                "blanks": [
                    {"blank_id": "23", "answer_key": "topic"},
                    {"blank_id": "24", "answer_key": "opinion"}
                ],
                "answer_key": {"23": "topic", "24": "opinion"}
            },
            "created_at": now_str
        },
        # Q25-26: Flowchart Completion
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section3_id,
            "index": 25,
            "type": "flowchart_completion_reading",
            "payload": {
                "prompt": "Complete the flowchart showing the essay writing process.",
                "flowchart_description": "Writing Process: Research → Plan → __25__ → __26__ → Submit",
                "blanks": [
                    {"blank_id": "25", "answer_key": "Draft"},
                    {"blank_id": "26", "answer_key": "Edit"}
                ],
                "answer_key": {"25": "Draft", "26": "Edit"}
            },
            "created_at": now_str
        },
        # Q27-30: Matching Features
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section3_id,
            "index": 27,
            "type": "matching_features",
            "payload": {
                "prompt": "Match each writing element with its purpose.",
                "items": ["Introduction", "Body paragraphs", "Conclusion", "Thesis statement"],
                "options": [
                    "A - Presents main argument",
                    "B - Provides supporting details",
                    "C - Summarizes key points",
                    "D - Introduces the topic"
                ],
                "answer_key": {
                    "Introduction": "D",
                    "Body paragraphs": "B",
                    "Conclusion": "C",
                    "Thesis statement": "A"
                }
            },
            "created_at": now_str
        }
    ]
    
    # ==================== SECTION 4: MIXED QUESTIONS (31-40) ====================
    
    mixed_questions = [
        # Q31: Fill in Gaps (Listening type)
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section4_id,
            "index": 31,
            "type": "fill_in_gaps",
            "payload": {
                "prompt": "AI can analyze medical __31__ with high accuracy.",
                "answer_key": "images"
            },
            "created_at": now_str
        },
        # Q32: Multiple Choice Single
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section4_id,
            "index": 32,
            "type": "multiple_choice_single_reading",
            "payload": {
                "prompt": "What is a challenge mentioned regarding AI in healthcare?",
                "options": [
                    "High costs",
                    "Data privacy concerns",
                    "Lack of computers",
                    "Too much speed"
                ],
                "answer_key": "B"
            },
            "created_at": now_str
        },
        # Q33: True/False/Not Given
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section4_id,
            "index": 33,
            "type": "true_false_not_given",
            "payload": {
                "prompt": "AI-powered diagnostic tools can help identify diseases earlier.",
                "answer_key": "TRUE"
            },
            "created_at": now_str
        },
        # Q34: Sentence Completion
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section4_id,
            "index": 34,
            "type": "sentence_completion_reading",
            "payload": {
                "prompt": "Complete the sentence: The integration of AI requires careful ethical consideration and robust ____.",
                "sentence": "The integration of AI requires careful ethical consideration and robust ____.",
                "answer_key": "regulatory frameworks"
            },
            "created_at": now_str
        },
        # Q35: Matching Sentence Endings
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section4_id,
            "index": 35,
            "type": "matching_sentence_endings",
            "payload": {
                "prompt": "Complete the sentence: Machine learning algorithms can",
                "sentence_beginnings": ["Machine learning algorithms can"],
                "endings": [
                    "analyze medical images accurately",
                    "replace all doctors",
                    "eliminate all diseases",
                    "work without data"
                ],
                "answer_key": {"Machine learning algorithms can": "A"}
            },
            "created_at": now_str
        },
        # Q36: Table Completion
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section4_id,
            "index": 36,
            "type": "table_completion_reading",
            "payload": {
                "prompt": "Complete the table about AI in healthcare.",
                "table_data": {
                    "headers": ["Benefit", "Challenge"],
                    "rows": [
                        ["Early disease detection", "__BLANK_36__"]
                    ]
                },
                "blanks": [
                    {"blank_id": "36", "answer_key": "Data privacy"}
                ],
                "answer_key": {"36": "Data privacy"}
            },
            "created_at": now_str
        },
        # Q37: Multiple Choice Multiple
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section4_id,
            "index": 37,
            "type": "multiple_choice_multiple_reading",
            "payload": {
                "prompt": "Which TWO issues must be addressed for AI in healthcare? Choose TWO letters.",
                "options": [
                    "Algorithmic bias",
                    "Patient exercise",
                    "Human oversight",
                    "Building design",
                    "Food quality"
                ],
                "max_selections": 2,
                "answer_key": ["A", "C"]
            },
            "created_at": now_str
        },
        # Q38: Summary Completion from Text
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section4_id,
            "index": 38,
            "type": "summary_completion_text",
            "payload": {
                "prompt": "Complete the summary using words from the passage.",
                "summary_text": "AI is transforming healthcare through __38__ that can diagnose diseases accurately.",
                "answer_key": "machine learning algorithms"
            },
            "created_at": now_str
        },
        # Q39: Map Labeling (conceptual diagram)
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section4_id,
            "index": 39,
            "type": "map_labeling",
            "payload": {
                "prompt": "Label the healthcare AI system component.",
                "image_url": "https://via.placeholder.com/500x300/28A745/FFFFFF?text=AI+Healthcare+System+Diagram",
                "labels": [
                    {"position": {"x": 250, "y": 150}, "blank_id": "39", "answer_key": "Diagnostic tool"}
                ],
                "options": ["Diagnostic tool", "Patient record", "Surgery room", "Pharmacy"],
                "answer_key": {"39": "Diagnostic tool"}
            },
            "created_at": now_str
        },
        # Q40: Form Completion
        {
            "exam_id": COMPREHENSIVE_EXAM_ID,
            "section_id": section4_id,
            "index": 40,
            "type": "form_completion",
            "payload": {
                "prompt": "Complete the AI implementation checklist.",
                "form_fields": [
                    {"label": "Primary Concern", "blank_id": "40", "answer_key": "Privacy"}
                ],
                "answer_key": {"40": "Privacy"}
            },
            "created_at": now_str
        }
    ]
    
    # Insert all questions
    all_questions = listening_questions + reading_questions + writing_questions + mixed_questions
    
    if all_questions:
        await db.questions.insert_many(all_questions)
    
    print(f"✅ Comprehensive IELTS Practice Test created successfully!")
    print(f"   - Exam ID: {COMPREHENSIVE_EXAM_ID}")
    print(f"   - Total Questions: 40")
    print(f"   - Section 1 (Listening): Questions 1-10")
    print(f"   - Section 2 (Reading): Questions 11-20")
    print(f"   - Section 3 (Writing): Questions 21-30")
    print(f"   - Section 4 (Mixed): Questions 31-40")
    print(f"   - Duration: 120 minutes")
    print(f"   - Status: Published and ready for admin to start")
    
    return COMPREHENSIVE_EXAM_ID

if __name__ == "__main__":
    asyncio.run(init_comprehensive_test())
