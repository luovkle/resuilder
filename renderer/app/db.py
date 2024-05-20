from pymongo import MongoClient

from app.config import settings

client = MongoClient(str(settings.MONGO_URI))  # type: ignore[var-annotated]
db = client[settings.MONGO_DB]
