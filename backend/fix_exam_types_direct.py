"""
Update existing exams to have proper exam_type values
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def update_exams():
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    db_name = os.environ.get('DB_NAME', 'ielts_test_db')
    db = client[db_name]
    
    print(f"Connected to database: {db_name}")
    print("=" * 60)
    
    # Update comprehensive test
    result1 = await db.exams.update_one(
        {"id": "comprehensive-ielts-practice-test"},
        {"$set": {"exam_type": "listening"}}
    )
    print(f"Comprehensive test: matched={result1.matched_count}, modified={result1.modified_count}")
    
    # Update preview test  
    result2 = await db.exams.update_one(
        {"id": "question-type-preview-test"},
        {"$set": {"exam_type": "listening"}}
    )
    print(f"Preview test: matched={result2.matched_count}, modified={result2.modified_count}")
    
    print("=" * 60)
    
    # Verify
    print("\nVerifying updates:")
    exams = await db.exams.find({"published": True}).to_list(None)
    for exam in exams:
        print(f"✅ {exam['title'][:50]}")
        print(f"   exam_type: {exam.get('exam_type', 'NOT SET')}")
        print(f"   published: {exam.get('published')}")
        print(f"   is_active: {exam.get('is_active')}")
        print()
    
    client.close()

if __name__ == "__main__":
    asyncio.run(update_exams())
