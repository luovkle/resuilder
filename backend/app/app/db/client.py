import os

from pymongo import MongoClient

client = MongoClient(os.getenv("DB_URI", ""))
