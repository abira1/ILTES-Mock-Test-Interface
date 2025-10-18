"""
Script to update existing exams with proper exam_type values
so they appear in the student dashboard
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def update_exam_types():
    # Connect to MongoDB
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    db = client['ielts_db']
    
    # Update specific exams with proper exam_type
    updates = [
        {
            "exam_id": "comprehensive-ielts-practice-test",
            "new_exam_type": "listening",
            "reason": "Comprehensive test should appear in listening section"
        },
        {
            "exam_id": "question-type-preview-test",
            "new_exam_type": "listening",
            "reason": "Preview test should appear in listening section"
        }
    ]
    
    print("Updating exam types for existing exams...")
    print("-" * 60)
    
    for update in updates:
        exam_id = update["exam_id"]
        new_type = update["new_exam_type"]
        
        # Find the exam
        exam = await db.exams.find_one({"_id": exam_id})
        
        if exam:
            old_type = exam.get("exam_type", "not set")
            result = await db.exams.update_one(
                {"_id": exam_id},
                {"$set": {"exam_type": new_type}}
            )
            
            print(f"✅ Updated: {exam.get('title', 'Unknown')}")
            print(f"   ID: {exam_id}")
            print(f"   Old exam_type: {old_type}")
            print(f"   New exam_type: {new_type}")
            print(f"   Reason: {update['reason']}")
            print(f"   Modified: {result.modified_count} document(s)")
            print("-" * 60)
        else:
            print(f"❌ Exam not found: {exam_id}")
            print("-" * 60)
    
    # Verify the changes
    print("\nVerifying updated exams:")
    print("-" * 60)
    exams = await db.exams.find({"published": True}).to_list(None)
    for exam in exams:
        print(f"📋 {exam.get('title', 'Unknown')}")
        print(f"   exam_type: {exam.get('exam_type', 'NOT SET')}")
        print(f"   published: {exam.get('published', False)}")
        print(f"   is_active: {exam.get('is_active', False)}")
        print("-" * 60)
    
    print("\n✅ Update complete!")
    
    # Close connection
    client.close()

if __name__ == "__main__":
    asyncio.run(update_exam_types())
