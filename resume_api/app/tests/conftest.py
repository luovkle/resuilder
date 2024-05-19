import pytest
from fastapi.testclient import TestClient
from pymongo import MongoClient
from pymongo.database import Database

from app.api.deps import get_db
from app.main import app
from app.tests.config import test_settings


@pytest.fixture(name="db")
def db_fixture():
    client = MongoClient(test_settings.TEST_DB_URI)
    db = client[test_settings.TEST_DB_NAME]
    yield db
    client.drop_database(db)
    client.close()


@pytest.fixture(name="client")
def client_fixture(db: Database):
    app.dependency_overrides[get_db] = lambda: db
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()
