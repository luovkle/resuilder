from app.core.config import settings
from app.core.db import client


def get_db():
    return client[settings.DB_NAME]
