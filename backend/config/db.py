import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables
load_dotenv()

# Get MongoDB URI
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise Exception("❌ MONGO_URI not found in .env")

try:
    # Create MongoDB client
    client = MongoClient(MONGO_URI)

    # Create / Connect Database
    db = client["ai_app_compiler"]

    print("✅ MongoDB Atlas Connected Successfully")

except Exception as e:
    print("❌ MongoDB Connection Failed")
    print(e)