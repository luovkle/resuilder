from pymongo import MongoClient

from app.config import settings

client = MongoClient(str(settings.MONGO_URI))
db = client[settings.MONGO_DB]
