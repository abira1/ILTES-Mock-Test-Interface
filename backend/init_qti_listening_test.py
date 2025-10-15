"""
QTI-Compliant IELTS Listening Practice Test
Creates a comprehensive listening test using all 10 QTI question types
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from datetime import datetime
import uuid
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# QTI Listening Test Data with all 10 question types
QTI_LISTENING_TEST_DATA = {
    "exam": {
        "id": "qti-listening-practice-test-1",
        "title": "IELTS Listening Practice Test 1 - QTI Edition", 
        "description": "Complete QTI-compliant listening test with all 10 question types",
        "exam_type": "listening",
        "duration_seconds": 2400,  # 40 minutes total (30 min listening + 10 min transfer)
        "audio_url": "https://audio.jukehost.co.uk/F9irt6LcsYuP93ulaMo42JfXBEcABytV",
        "question_count": 40,
        "published": True,
        "is_active": False,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    "sections": [
        {
            # SECTION 1: Form Completion & Fill in Gaps
            "index": 1,
            "title": "Section 1",
            "description": "Conversation in a social context",
            "audio_start_time": 0,
            "audio_end_time": 600,  # 10 minutes
            "questions": [
                # Questions 1-3: Form Completion
                {
                    "index": 1,
                    "type": "form_completion",
                    "payload": {
                        "question_range": "1-3",
                        "instructions": "Complete the form. Write NO MORE THAN THREE WORDS AND/OR A NUMBER in each gap.",
                        "form_title": "STUDENT HOUSING APPLICATION FORM",
                        "fields": [
                            {"label": "Name:", "content": "Sarah", "isBlank": False},
                            {"label": "Surname:", "question_number": 1, "isBlank": True, "answer_key": "PETERSON"},
                            {"label": "Phone number:", "question_number": 2, "isBlank": True, "answer_key": "07789 542316"},
                            {"label": "Current address:", "content": "16 Rose Street, Birmingham", "isBlank": False},
                            {"label": "Preferred room type:", "question_number": 3, "isBlank": True, "answer_key": "SINGLE ROOM"}
                        ],
                        "max_words": 3
                    }
                },
                # Questions 4-7: Fill in the Gaps (Note completion style)
                {
                    "index": 4,
                    "type": "fill_in_gaps",
                    "payload": {
                        "question_range": "4-7",
                        "form_title": "Housing Information",
                        "table_data": {
                            "headers": ["Feature", "Details"],
                            "rows": [
                                {
                                    "cells": [
                                        {"content": "Rent per week", "isBlank": False},
                                        {"content": "£", "isBlank": False, "question_number": 4, "isBlank": True, "answer_key": "127"}
                                    ]
                                },
                                {
                                    "cells": [
                                        {"content": "Deposit required", "isBlank": False},
                                        {"question_number": 5, "isBlank": True, "answer_key": "TWO WEEKS"}
                                    ]
                                },
                                {
                                    "cells": [
                                        {"content": "Kitchen facilities", "isBlank": False},
                                        {"question_number": 6, "isBlank": True, "answer_key": "SHARED"}
                                    ]
                                },
                                {
                                    "cells": [
                                        {"content": "Internet access", "isBlank": False},
                                        {"question_number": 7, "isBlank": True, "answer_key": "FREE"}
                                    ]
                                }
                            ]
                        }
                    }
                },
                # Questions 8-10: Fill in Gaps Short Answers
                {
                    "index": 8,
                    "type": "fill_in_gaps_short_answers",
                    "payload": {
                        "prompt": "The viewing appointment is at __8__ on __9__ in room __10__.",
                        "max_words": 2,
                        "answer_key": "2:30 PM"
                    }
                },
                {
                    "index": 9,
                    "type": "fill_in_gaps_short_answers",
                    "payload": {
                        "prompt": "The viewing appointment is at 2:30 PM on __9__ in room __10__.",
                        "max_words": 1,
                        "answer_key": "THURSDAY"
                    }
                },
                {
                    "index": 10,
                    "type": "fill_in_gaps_short_answers",
                    "payload": {
                        "prompt": "The viewing appointment is at 2:30 PM on Thursday in room __10__.",
                        "max_words": 1,
                        "answer_key": "B15"
                    }
                }
            ]
        },
        {
            # SECTION 2: Map Labeling & Multiple Choice
            "index": 2,
            "title": "Section 2",
            "description": "Monologue in a social context (campus tour)",
            "audio_start_time": 600,
            "audio_end_time": 1200,  # 10 minutes
            "questions": [
                # Questions 11-14: Map Labeling
                {
                    "index": 11,
                    "type": "map_labeling",
                    "payload": {
                        "question_range": "11-14",
                        "prompt": "Library",
                        "image_url": "https://i.imgur.com/campus_map.png",
                        "options": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                        "answer_key": "C"
                    }
                },
                {
                    "index": 12,
                    "type": "map_labeling",
                    "payload": {
                        "prompt": "Student Center",
                        "image_url": "https://i.imgur.com/campus_map.png",
                        "options": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                        "answer_key": "F"
                    }
                },
                {
                    "index": 13,
                    "type": "map_labeling",
                    "payload": {
                        "prompt": "Cafeteria",
                        "image_url": "https://i.imgur.com/campus_map.png",
                        "options": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                        "answer_key": "A"
                    }
                },
                {
                    "index": 14,
                    "type": "map_labeling",
                    "payload": {
                        "prompt": "Sports Center",
                        "image_url": "https://i.imgur.com/campus_map.png",
                        "options": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                        "answer_key": "H"
                    }
                },
                # Questions 15-17: Multiple Choice (Single Answer)
                {
                    "index": 15,
                    "type": "multiple_choice_single",
                    "payload": {
                        "prompt": "What is the main purpose of the campus tour?",
                        "options": [
                            "To show new students around",
                            "To promote university facilities", 
                            "To collect feedback from visitors",
                            "To demonstrate security procedures"
                        ],
                        "answer_key": "A"
                    }
                },
                {
                    "index": 16,
                    "type": "multiple_choice_single",
                    "payload": {
                        "prompt": "When is the library usually busiest?",
                        "options": [
                            "Early morning",
                            "Lunch time",
                            "Late afternoon",
                            "Evening"
                        ],
                        "answer_key": "C"
                    }
                },
                {
                    "index": 17,
                    "type": "multiple_choice_single",
                    "payload": {
                        "prompt": "What do students need to access the gym?",
                        "options": [
                            "Student ID card",
                            "Special membership",
                            "Advance booking",
                            "Sports clothing"
                        ],
                        "answer_key": "A"
                    }
                },
                # Questions 18-20: Multiple Choice (Multiple Answers)
                {
                    "index": 18,
                    "type": "multiple_choice_multiple",
                    "payload": {
                        "question_range": "18-20",
                        "prompt": "Which THREE services are available in the library?",
                        "options": [
                            "Computer access",
                            "Photocopying",
                            "Study rooms",
                            "Coffee shop",
                            "Tutoring services"
                        ],
                        "answer_key": ["A", "B", "C"],
                        "select_count": 3
                    }
                }
            ]
        },
        {
            # SECTION 3: Matching & Table Completion
            "index": 3,
            "title": "Section 3", 
            "description": "Conversation in an academic context",
            "audio_start_time": 1200,
            "audio_end_time": 1800,  # 10 minutes
            "questions": [
                # Questions 21-25: Matching
                {
                    "index": 21,
                    "type": "matching",
                    "payload": {
                        "question_range": "21-25",
                        "instructions": "Match each research method to the correct description.",
                        "left_title": "Research Methods",
                        "right_title": "Descriptions",
                        "left_items": [
                            {"id": 1, "question_number": 21, "text": "Surveys"},
                            {"id": 2, "question_number": 22, "text": "Interviews"},
                            {"id": 3, "question_number": 23, "text": "Observations"},
                            {"id": 4, "question_number": 24, "text": "Case Studies"},
                            {"id": 5, "question_number": 25, "text": "Experiments"}
                        ],
                        "right_items": [
                            {"key": "A", "text": "Detailed analysis of specific situations"},
                            {"key": "B", "text": "Watching behavior in natural settings"},
                            {"key": "C", "text": "One-on-one conversations for deep insights"},
                            {"key": "D", "text": "Controlled testing of hypotheses"},
                            {"key": "E", "text": "Large-scale data collection from many people"},
                            {"key": "F", "text": "Analysis of existing documents"}
                        ]
                    }
                },
                # Questions 26-30: Table Completion
                {
                    "index": 26,
                    "type": "table_completion", 
                    "payload": {
                        "question_range": "26-30",
                        "table_title": "Research Project Timeline",
                        "headers": ["Phase", "Duration", "Main Activity"],
                        "rows": [
                            {
                                "cells": [
                                    {"content": "Planning", "isBlank": False},
                                    {"question_number": 26, "isBlank": True, "answer_key": "2 WEEKS"},
                                    {"content": "Literature review", "isBlank": False}
                                ]
                            },
                            {
                                "cells": [
                                    {"content": "Data Collection", "isBlank": False},
                                    {"content": "6 weeks", "isBlank": False},
                                    {"question_number": 27, "isBlank": True, "answer_key": "INTERVIEWS"}
                                ]
                            },
                            {
                                "cells": [
                                    {"question_number": 28, "isBlank": True, "answer_key": "ANALYSIS"},
                                    {"content": "4 weeks", "isBlank": False},
                                    {"content": "Statistical processing", "isBlank": False}
                                ]
                            },
                            {
                                "cells": [
                                    {"content": "Writing", "isBlank": False},
                                    {"question_number": 29, "isBlank": True, "answer_key": "3 WEEKS"},
                                    {"question_number": 30, "isBlank": True, "answer_key": "DRAFT REPORT"}
                                ]
                            }
                        ],
                        "max_words": 2
                    }
                }
            ]
        },
        {
            # SECTION 4: Sentence Completion & Flowchart
            "index": 4,
            "title": "Section 4",
            "description": "Academic monologue",
            "audio_start_time": 1800,
            "audio_end_time": 2400,  # 10 minutes
            "questions": [
                # Questions 31-35: Sentence Completion
                {
                    "index": 31,
                    "type": "sentence_completion",
                    "payload": {
                        "question_range": "31-35",
                        "sentences": [
                            {
                                "question_number": 31,
                                "text": "Climate change is primarily caused by increased __31__ in the atmosphere.",
                                "answer_key": "GREENHOUSE GASES"
                            },
                            {
                                "question_number": 32, 
                                "text": "The main source of carbon emissions is the burning of __32__.",
                                "answer_key": "FOSSIL FUELS"
                            },
                            {
                                "question_number": 33,
                                "text": "Global temperatures have risen by __33__ degrees in the last century.",
                                "answer_key": "ONE"
                            },
                            {
                                "question_number": 34,
                                "text": "Sea levels are rising due to thermal expansion and melting __34__.",
                                "answer_key": "ICE CAPS"
                            },
                            {
                                "question_number": 35,
                                "text": "Renewable energy sources include solar, wind, and __35__ power.",
                                "answer_key": "HYDROELECTRIC"
                            }
                        ],
                        "max_words": 2
                    }
                },
                # Questions 36-40: Flowchart Completion
                {
                    "index": 36,
                    "type": "flowchart_completion",
                    "payload": {
                        "question_range": "36-40",
                        "title": "Carbon Cycle Process",
                        "layout": "vertical",
                        "steps": [
                            {
                                "text": "Atmospheric CO2 absorbed by plants",
                                "isBlank": False
                            },
                            {
                                "question_number": 36,
                                "isBlank": True,
                                "answer_key": "PHOTOSYNTHESIS"
                            },
                            {
                                "text": "Carbon stored in plant tissues",
                                "isBlank": False
                            },
                            {
                                "question_number": 37,
                                "isBlank": True,
                                "answer_key": "DECOMPOSITION"
                            },
                            {
                                "question_number": 38,
                                "isBlank": True,
                                "answer_key": "SOIL CARBON"
                            },
                            {
                                "text": "Carbon released through",
                                "isBlank": False
                            },
                            {
                                "question_number": 39,
                                "isBlank": True,
                                "answer_key": "RESPIRATION"
                            },
                            {
                                "question_number": 40,
                                "isBlank": True,
                                "answer_key": "ATMOSPHERE"
                            }
                        ],
                        "max_words": 1
                    }
                }
            ]
        }
    ]
}

def create_qti_listening_test():
    """Create the comprehensive QTI listening test"""
    try:
        db = get_database()
        
        # Create exam
        exam_data = QTI_LISTENING_TEST_DATA["exam"]
        result = db.exams.replace_one(
            {"id": exam_data["id"]}, 
            exam_data, 
            upsert=True
        )
        print(f"✅ Created exam: {exam_data['title']}")
        
        # Create sections and questions
        for section_data in QTI_LISTENING_TEST_DATA["sections"]:
            section_data["exam_id"] = exam_data["id"]
            
            # Insert section
            db.sections.replace_one(
                {"exam_id": exam_data["id"], "index": section_data["index"]},
                section_data,
                upsert=True
            )
            print(f"✅ Created section {section_data['index']}: {section_data['title']}")
            
            # Insert questions
            for question_data in section_data["questions"]:
                question_data["exam_id"] = exam_data["id"]
                question_data["section_index"] = section_data["index"]
                question_data["id"] = f"{exam_data['id']}-q{question_data['index']}"
                
                db.questions.replace_one(
                    {"exam_id": exam_data["id"], "index": question_data["index"]},
                    question_data,
                    upsert=True
                )
            
            print(f"✅ Created {len(section_data['questions'])} questions for section {section_data['index']}")
        
        print(f"\n🎉 QTI Listening Test created successfully!")
        print(f"📊 Total questions: {exam_data['question_count']}")
        print(f"⏱️  Duration: {exam_data['duration_seconds'] // 60} minutes")
        print(f"🔗 Exam ID: {exam_data['id']}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating QTI listening test: {e}")
        return False

if __name__ == "__main__":
    with app.app_context():
        create_qti_listening_test()