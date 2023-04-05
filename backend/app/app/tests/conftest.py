import os

import pytest
from pymongo import MongoClient
from fastapi.testclient import TestClient

from app.main import app
from app.api.deps import get_db

db_uri = os.getenv("TEST_DB_URI", "")


@pytest.fixture(name="client")
def client_fixture():
    def get_db_override():
        mongo_client = MongoClient(db_uri)
        db = mongo_client.resuilder
        yield db
        mongo_client.drop_database(db)
        mongo_client.close()

    app.dependency_overrides[get_db] = get_db_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()
