"""
Fresh QTI-Compliant IELTS Listening Practice Test
Complete implementation with all 10 QTI question types and 40 questions
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

# Fresh QTI Listening Test with all 40 questions using all 10 types
FRESH_QTI_LISTENING_TEST = {
    "exam": {
        "id": "fresh-qti-listening-test",
        "title": "IELTS Listening Practice Test - Fresh QTI Edition", 
        "description": "Complete fresh QTI test with all 10 question types (40 questions total)",
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
            # SECTION 1: Questions 1-10 (Social Conversation)
            "index": 1,
            "title": "Section 1",
            "description": "Conversation between two people set in an everyday social context",
            "audio_start_time": 0,
            "audio_end_time": 600,
            "questions": [
                # Q1-3: Form Completion
                {
                    "index": 1,
                    "type": "form_completion",
                    "payload": {
                        "question_range": "1-3",
                        "instructions": "Complete the booking form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
                        "form_title": "CONCERT BOOKING FORM",
                        "fields": [
                            {"label": "Customer name:", "content": "Janet", "isBlank": False},
                            {"label": "Last name:", "question_number": 1, "isBlank": True, "answer_key": "PARKER"},
                            {"label": "Telephone:", "question_number": 2, "isBlank": True, "answer_key": "01937 668542"},
                            {"label": "Address:", "content": "52 Middle Lane, York", "isBlank": False},
                            {"label": "Number of tickets:", "question_number": 3, "isBlank": True, "answer_key": "TWO"}
                        ]
                    }
                },
                # Q2: Part of form completion above
                {
                    "index": 2,
                    "type": "form_completion",
                    "payload": {
                        "linked_to": 1,
                        "answer_key": "01937 668542"
                    }
                },
                # Q3: Part of form completion above  
                {
                    "index": 3,
                    "type": "form_completion",
                    "payload": {
                        "linked_to": 1,
                        "answer_key": "TWO"
                    }
                },
                # Q4-6: Fill in Gaps (Table)
                {
                    "index": 4,
                    "type": "fill_in_gaps",
                    "payload": {
                        "question_range": "4-6",
                        "instructions": "Complete the table. Write NO MORE THAN ONE WORD for each answer.",
                        "form_title": "CONCERT INFORMATION",
                        "table_data": {
                            "headers": ["Date", "Venue", "Price"],
                            "rows": [
                                {
                                    "cells": [
                                        {"content": "July 20th", "isBlank": False},
                                        {"question_number": 4, "isBlank": True, "answer_key": "CATHEDRAL"},
                                        {"content": "£25", "isBlank": False}
                                    ]
                                },
                                {
                                    "cells": [
                                        {"content": "July 25th", "isBlank": False},
                                        {"content": "Town Hall", "isBlank": False},
                                        {"question_number": 5, "isBlank": True, "answer_key": "£30"}
                                    ]
                                },
                                {
                                    "cells": [
                                        {"question_number": 6, "isBlank": True, "answer_key": "AUGUST 1ST"},
                                        {"content": "Opera House", "isBlank": False},
                                        {"content": "£35", "isBlank": False}
                                    ]
                                }
                            ]
                        }
                    }
                },
                # Q5: Part of fill in gaps above
                {
                    "index": 5,
                    "type": "fill_in_gaps",
                    "payload": {
                        "linked_to": 4,
                        "answer_key": "£30"
                    }
                },
                # Q6: Part of fill in gaps above
                {
                    "index": 6,
                    "type": "fill_in_gaps",
                    "payload": {
                        "linked_to": 4,
                        "answer_key": "AUGUST 1ST"
                    }
                },
                # Q7-8: Fill in Gaps Short Answers
                {
                    "index": 7,
                    "type": "fill_in_gaps_short_answers",
                    "payload": {
                        "instructions": "Complete the sentences. Write NO MORE THAN TWO WORDS for each answer.",
                        "sentences": [
                            {
                                "text": "Tickets can be collected from the box office or ___7___.",
                                "question_number": 7,
                                "answer_key": "BY POST"
                            },
                            {
                                "text": "The concert will last approximately ___8___ hours.",
                                "question_number": 8, 
                                "answer_key": "TWO"
                            }
                        ]
                    }
                },
                # Q8: Part of fill in gaps short answers above
                {
                    "index": 8,
                    "type": "fill_in_gaps_short_answers",
                    "payload": {
                        "linked_to": 7,
                        "answer_key": "TWO"
                    }
                },
                # Q9-10: Multiple Choice Single
                {
                    "index": 9,
                    "type": "multiple_choice_single",
                    "payload": {
                        "question_number": 9,
                        "question_text": "What is included in the ticket price?",
                        "options": [
                            {"label": "A", "text": "A programme and interval drinks"},
                            {"label": "B", "text": "A programme only"},
                            {"label": "C", "text": "Interval drinks only"}
                        ],
                        "answer_key": "A"
                    }
                },
                {
                    "index": 10,
                    "type": "multiple_choice_single",
                    "payload": {
                        "question_number": 10,
                        "question_text": "Where should customers park?",
                        "options": [
                            {"label": "A", "text": "Behind the venue"},
                            {"label": "B", "text": "In the city center car park"},
                            {"label": "C", "text": "On the street nearby"}
                        ],
                        "answer_key": "B"
                    }
                }
            ]
        },
        {
            # SECTION 2: Questions 11-20 (Social/Academic Context)
            "index": 2,
            "title": "Section 2",
            "description": "Monologue in social context",
            "audio_start_time": 600,
            "audio_end_time": 1200,
            "questions": [
                # Q11-14: Map Labeling
                {
                    "index": 11,
                    "type": "map_labeling",
                    "payload": {
                        "question_range": "11-14",
                        "instructions": "Look at the map of the shopping center. Choose FOUR answers from the box and write the correct letter A-H next to questions 11-14.",
                        "map_image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
                        "options": [
                            {"letter": "A", "text": "Bookstore"},
                            {"letter": "B", "text": "Café"},
                            {"letter": "C", "text": "Bank"},
                            {"letter": "D", "text": "Pharmacy"},
                            {"letter": "E", "text": "Post Office"},
                            {"letter": "F", "text": "Supermarket"},
                            {"letter": "G", "text": "Gift Shop"},
                            {"letter": "H", "text": "Restaurant"}
                        ],
                        "questions": [
                            {"number": 11, "label": "Near the main entrance", "answer_key": "C"},
                            {"number": 12, "label": "Next to the escalator", "answer_key": "A"},
                            {"number": 13, "label": "On the second floor", "answer_key": "B"},
                            {"number": 14, "label": "Opposite the information desk", "answer_key": "E"}
                        ]
                    }
                },
                # Q12-14: Part of map labeling above
                {
                    "index": 12,
                    "type": "map_labeling",
                    "payload": {
                        "linked_to": 11,
                        "answer_key": "A"
                    }
                },
                {
                    "index": 13,
                    "type": "map_labeling",
                    "payload": {
                        "linked_to": 11,
                        "answer_key": "B"
                    }
                },
                {
                    "index": 14,
                    "type": "map_labeling",
                    "payload": {
                        "linked_to": 11,
                        "answer_key": "E"
                    }
                },
                # Q15-17: Multiple Choice Multiple
                {
                    "index": 15,
                    "type": "multiple_choice_multiple",
                    "payload": {
                        "question_range": "15-17",
                        "question_text": "Which THREE facilities are available in the shopping center?",
                        "instructions": "Choose THREE letters A-G.",
                        "options": [
                            {"label": "A", "text": "Free Wi-Fi"},
                            {"label": "B", "text": "Baby changing rooms"},
                            {"label": "C", "text": "Wheelchair access"},
                            {"label": "D", "text": "Pet care service"},
                            {"label": "E", "text": "Currency exchange"},
                            {"label": "F", "text": "Lost property office"},
                            {"label": "G", "text": "First aid room"}
                        ],
                        "answer_keys": ["A", "C", "G"],
                        "max_selections": 3
                    }
                },
                # Q16-17: Part of multiple choice multiple above
                {
                    "index": 16,
                    "type": "multiple_choice_multiple",
                    "payload": {
                        "linked_to": 15,
                        "answer_key": "C"
                    }
                },
                {
                    "index": 17,
                    "type": "multiple_choice_multiple",
                    "payload": {
                        "linked_to": 15,
                        "answer_key": "G"
                    }
                },
                # Q18-20: Table Completion
                {
                    "index": 18,
                    "type": "table_completion",
                    "payload": {
                        "question_range": "18-20",
                        "instructions": "Complete the table. Write NO MORE THAN TWO WORDS for each answer.",
                        "table_title": "SHOP OPENING HOURS",
                        "table_data": {
                            "headers": ["Shop", "Weekdays", "Weekend"],
                            "rows": [
                                {
                                    "cells": [
                                        {"content": "Electronics Store", "isBlank": False},
                                        {"question_number": 18, "isBlank": True, "answer_key": "9 AM"},
                                        {"content": "10 AM - 6 PM", "isBlank": False}
                                    ]
                                },
                                {
                                    "cells": [
                                        {"content": "Fashion Boutique", "isBlank": False},
                                        {"content": "10 AM - 8 PM", "isBlank": False},
                                        {"question_number": 19, "isBlank": True, "answer_key": "CLOSED"}
                                    ]
                                },
                                {
                                    "cells": [
                                        {"content": "Food Court", "isBlank": False},
                                        {"content": "11 AM - 10 PM", "isBlank": False},
                                        {"question_number": 20, "isBlank": True, "answer_key": "24 HOURS"}
                                    ]
                                }
                            ]
                        }
                    }
                },
                # Q19-20: Part of table completion above
                {
                    "index": 19,
                    "type": "table_completion",
                    "payload": {
                        "linked_to": 18,
                        "answer_key": "CLOSED"
                    }
                },
                {
                    "index": 20,
                    "type": "table_completion",
                    "payload": {
                        "linked_to": 18,
                        "answer_key": "24 HOURS"
                    }
                }
            ]
        },
        {
            # SECTION 3: Questions 21-30 (Educational/Training Context)
            "index": 3,
            "title": "Section 3",
            "description": "Conversation between up to four people in educational context",
            "audio_start_time": 1200,
            "audio_end_time": 1800,
            "questions": [
                # Q21-25: Matching
                {
                    "index": 21,
                    "type": "matching",
                    "payload": {
                        "question_range": "21-25",
                        "instructions": "What does each student say about their research project? Choose FIVE answers from the box and write the correct letter A-H next to questions 21-25.",
                        "options": [
                            {"letter": "A", "text": "It was more difficult than expected"},
                            {"letter": "B", "text": "It provided useful practical experience"},
                            {"letter": "C", "text": "It took longer than planned"},
                            {"letter": "D", "text": "It was well-supervised"},
                            {"letter": "E", "text": "It had unexpected results"},
                            {"letter": "F", "text": "It required additional resources"},
                            {"letter": "G", "text": "It was highly relevant to the course"},
                            {"letter": "H", "text": "It involved interesting methodology"}
                        ],
                        "items": [
                            {"number": 21, "text": "Sarah's project", "answer_key": "B"},
                            {"number": 22, "text": "Mike's project", "answer_key": "A"},
                            {"number": 23, "text": "Lisa's project", "answer_key": "E"},
                            {"number": 24, "text": "Tom's project", "answer_key": "G"},
                            {"number": 25, "text": "Anna's project", "answer_key": "H"}
                        ]
                    }
                },
                # Q22-25: Part of matching above
                {
                    "index": 22,
                    "type": "matching",
                    "payload": {
                        "linked_to": 21,
                        "answer_key": "A"
                    }
                },
                {
                    "index": 23,
                    "type": "matching",
                    "payload": {
                        "linked_to": 21,
                        "answer_key": "E"
                    }
                },
                {
                    "index": 24,
                    "type": "matching",
                    "payload": {
                        "linked_to": 21,
                        "answer_key": "G"
                    }
                },
                {
                    "index": 25,
                    "type": "matching",
                    "payload": {
                        "linked_to": 21,
                        "answer_key": "H"
                    }
                },
                # Q26-30: Sentence Completion
                {
                    "index": 26,
                    "type": "sentence_completion",
                    "payload": {
                        "question_range": "26-30",
                        "instructions": "Complete the sentences. Write NO MORE THAN TWO WORDS for each answer.",
                        "sentences": [
                            {
                                "text": "The research methodology workshop is scheduled for ___26___.",
                                "question_number": 26,
                                "answer_key": "NEXT TUESDAY"
                            },
                            {
                                "text": "Students must submit their ___27___ by Friday.",
                                "question_number": 27,
                                "answer_key": "DRAFT PROPOSAL"
                            },
                            {
                                "text": "The library will provide access to ___28___ for the research.",
                                "question_number": 28,
                                "answer_key": "ONLINE DATABASES"
                            },
                            {
                                "text": "Each student needs to attend a ___29___ with their supervisor.",
                                "question_number": 29,
                                "answer_key": "PLANNING MEETING"
                            },
                            {
                                "text": "The final presentation should last approximately ___30___ minutes.",
                                "question_number": 30,
                                "answer_key": "FIFTEEN"
                            }
                        ]
                    }
                },
                # Q27-30: Part of sentence completion above
                {
                    "index": 27,
                    "type": "sentence_completion",
                    "payload": {
                        "linked_to": 26,
                        "answer_key": "DRAFT PROPOSAL"
                    }
                },
                {
                    "index": 28,
                    "type": "sentence_completion",
                    "payload": {
                        "linked_to": 26,
                        "answer_key": "ONLINE DATABASES"
                    }
                },
                {
                    "index": 29,
                    "type": "sentence_completion",
                    "payload": {
                        "linked_to": 26,
                        "answer_key": "PLANNING MEETING"
                    }
                },
                {
                    "index": 30,
                    "type": "sentence_completion",
                    "payload": {
                        "linked_to": 26,
                        "answer_key": "FIFTEEN"
                    }
                }
            ]
        },
        {
            # SECTION 4: Questions 31-40 (Academic Monologue)
            "index": 4,
            "title": "Section 4",
            "description": "Monologue on academic subject",
            "audio_start_time": 1800,
            "audio_end_time": 2400,
            "questions": [
                # Q31-35: Flowchart Completion
                {
                    "index": 31,
                    "type": "flowchart_completion",
                    "payload": {
                        "question_range": "31-35",
                        "instructions": "Complete the flowchart. Write NO MORE THAN TWO WORDS for each answer.",
                        "flowchart_title": "WATER PURIFICATION PROCESS",
                        "flowchart_image": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
                        "steps": [
                            {
                                "step": 1,
                                "text": "Raw water enters the ___31___",
                                "question_number": 31,
                                "answer_key": "INTAKE CHAMBER"
                            },
                            {
                                "step": 2,
                                "text": "Particles are removed by ___32___",
                                "question_number": 32,
                                "answer_key": "SEDIMENTATION"
                            },
                            {
                                "step": 3,
                                "text": "Water passes through ___33___ filters",
                                "question_number": 33,
                                "answer_key": "SAND"
                            },
                            {
                                "step": 4,
                                "text": "___34___ is added for disinfection",
                                "question_number": 34,
                                "answer_key": "CHLORINE"
                            },
                            {
                                "step": 5,
                                "text": "Clean water is stored in ___35___",
                                "question_number": 35,
                                "answer_key": "STORAGE TANKS"
                            }
                        ]
                    }
                },
                # Q32-35: Part of flowchart completion above
                {
                    "index": 32,
                    "type": "flowchart_completion",
                    "payload": {
                        "linked_to": 31,
                        "answer_key": "SEDIMENTATION"
                    }
                },
                {
                    "index": 33,
                    "type": "flowchart_completion",
                    "payload": {
                        "linked_to": 31,
                        "answer_key": "SAND"
                    }
                },
                {
                    "index": 34,
                    "type": "flowchart_completion",
                    "payload": {
                        "linked_to": 31,
                        "answer_key": "CHLORINE"
                    }
                },
                {
                    "index": 35,
                    "type": "flowchart_completion",
                    "payload": {
                        "linked_to": 31,
                        "answer_key": "STORAGE TANKS"
                    }
                },
                # Q36-40: Multiple Choice Single (Academic)
                {
                    "index": 36,
                    "type": "multiple_choice_single",
                    "payload": {
                        "question_number": 36,
                        "question_text": "What is the main advantage of the new purification system?",
                        "options": [
                            {"label": "A", "text": "It is more cost-effective"},
                            {"label": "B", "text": "It produces higher quality water"},
                            {"label": "C", "text": "It requires less maintenance"}
                        ],
                        "answer_key": "B"
                    }
                },
                {
                    "index": 37,
                    "type": "multiple_choice_single",
                    "payload": {
                        "question_number": 37,
                        "question_text": "How often should the filters be replaced?",
                        "options": [
                            {"label": "A", "text": "Every month"},
                            {"label": "B", "text": "Every six months"},
                            {"label": "C", "text": "Every year"}
                        ],
                        "answer_key": "B"
                    }
                },
                {
                    "index": 38,
                    "type": "multiple_choice_single",
                    "payload": {
                        "question_number": 38,
                        "question_text": "What percentage of impurities does the system remove?",
                        "options": [
                            {"label": "A", "text": "85%"},
                            {"label": "B", "text": "95%"},
                            {"label": "C", "text": "99%"}
                        ],
                        "answer_key": "C"
                    }
                },
                {
                    "index": 39,
                    "type": "multiple_choice_single",
                    "payload": {
                        "question_number": 39,
                        "question_text": "Which stage is most critical for water safety?",
                        "options": [
                            {"label": "A", "text": "Filtration"},
                            {"label": "B", "text": "Disinfection"},
                            {"label": "C", "text": "Storage"}
                        ],
                        "answer_key": "B"
                    }
                },
                {
                    "index": 40,
                    "type": "multiple_choice_single",
                    "payload": {
                        "question_number": 40,
                        "question_text": "What is the recommended daily water intake per person?",
                        "options": [
                            {"label": "A", "text": "1.5 liters"},
                            {"label": "B", "text": "2 liters"},
                            {"label": "C", "text": "2.5 liters"}
                        ],
                        "answer_key": "B"
                    }
                }
            ]
        }
    ]
}

async def create_fresh_qti_listening_test():
    """Create the comprehensive fresh QTI listening test"""
    try:
        # First, delete existing test if it exists
        await db.exams.delete_one({"id": FRESH_QTI_LISTENING_TEST["exam"]["id"]})
        await db.sections.delete_many({"exam_id": FRESH_QTI_LISTENING_TEST["exam"]["id"]})
        await db.questions.delete_many({"exam_id": FRESH_QTI_LISTENING_TEST["exam"]["id"]})
        
        # Create exam
        exam_data = FRESH_QTI_LISTENING_TEST["exam"]
        await db.exams.insert_one(exam_data.copy())
        print(f"✅ Created exam: {exam_data['title']}")
        
        # Create sections and questions
        total_questions_created = 0
        for section_data in FRESH_QTI_LISTENING_TEST["sections"]:
            section_data["exam_id"] = exam_data["id"]
            
            # Insert section
            section_copy = section_data.copy()
            questions = section_copy.pop("questions", [])
            section_copy["id"] = f"{exam_data['id']}-section-{section_data['index']}"
            await db.sections.insert_one(section_copy)
            print(f"✅ Created section {section_data['index']}: {section_data['title']}")
            
            # Insert questions
            for question_data in questions:
                question_copy = question_data.copy()
                question_copy["exam_id"] = exam_data["id"]
                question_copy["section_id"] = section_copy["id"]
                question_copy["id"] = f"{exam_data['id']}-q{question_copy['index']}"
                
                await db.questions.insert_one(question_copy)
                total_questions_created += 1
            
            print(f"✅ Created {len(questions)} questions for section {section_data['index']}")
        
        print(f"\n🎉 Fresh QTI Listening Test created successfully!")
        print(f"📊 Total questions created: {total_questions_created}")
        print(f"📊 Expected questions: {exam_data['question_count']}")
        print(f"⏱️  Duration: {exam_data['duration_seconds'] // 60} minutes")
        print(f"🔗 Exam ID: {exam_data['id']}")
        
        if total_questions_created != exam_data['question_count']:
            print(f"⚠️  Warning: Question count mismatch!")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating fresh QTI listening test: {e}")
        return False

if __name__ == "__main__":
    import asyncio
    asyncio.run(create_fresh_qti_listening_test())