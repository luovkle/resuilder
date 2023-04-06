import os

import pytest
from pymongo import MongoClient
from pymongo.database import Database
from fastapi.testclient import TestClient

from app.main import app
from app.api.deps import get_db

db_uri = os.getenv("TEST_DB_URI", "")


@pytest.fixture(name="db")
def db_fixture():
    mongo_client = MongoClient(db_uri)
    db = mongo_client.resuilder
    yield db
    mongo_client.drop_database(db)
    mongo_client.close()


@pytest.fixture(name="client")
def client_fixture(db: Database):
    app.dependency_overrides[get_db] = lambda: db
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()
