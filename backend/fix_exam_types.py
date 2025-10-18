"""
One-time migration script to add exam_type field to existing exams that don't have it.
This ensures all existing tests will appear in the student dashboard.
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def fix_exam_types():
    # Connect to MongoDB
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    db = client['ielts_db']
    
    # Find all exams without exam_type field
    exams_without_type = await db.exams.find({"exam_type": {"$exists": False}}).to_list(None)
    
    print(f"Found {len(exams_without_type)} exams without exam_type field")
    
    # Update each exam with default exam_type='listening'
    for exam in exams_without_type:
        exam_id = exam.get('id') or exam.get('_id')
        result = await db.exams.update_one(
            {"_id": exam_id},
            {"$set": {"exam_type": "listening"}}
        )
        print(f"Updated exam '{exam.get('title', 'Unknown')}' (ID: {exam_id}) - matched: {result.matched_count}, modified: {result.modified_count}")
    
    print(f"✅ Migration complete! Updated {len(exams_without_type)} exams")
    
    # Close connection
    client.close()

if __name__ == "__main__":
    asyncio.run(fix_exam_types())
