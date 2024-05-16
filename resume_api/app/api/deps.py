from app.core.config import settings
from app.db import client


def get_db():
    return client[settings.DB_NAME]
