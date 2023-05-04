import os

from fastapi.testclient import TestClient
from dotenv import load_dotenv
from pymongo.database import Database

from app.schemas.profile import ProfileRead

load_dotenv()

BASE_URL = "/profiles/@me"
ACCESS_TOKEN = os.getenv("TEST_AUTH0_ACCESS_TOKEN", "")


def test_valid_access_token_required(client: TestClient):
    """Check that a valid access token is required to access the /profiles/@me
    endpoint."""
    response = client.put(BASE_URL)
    assert response.status_code == 403


def test_valid_access_token_provided(client: TestClient):
    """Check that the /profiles/@me endpoint can be accessed with a valid access
    token."""
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    response = client.put(BASE_URL, headers=headers)
    assert response.status_code != 403


def test_invalid_access_token_provided(client: TestClient):
    """Check that an authorization error is returned when accessing the /profiles/@me
    endpoint with an invalid access token."""
    headers = {"Authorization": "Bearer INVALID_ACCESS_TOKEN"}
    response = client.put(BASE_URL, headers=headers)
    assert response.status_code == 401


def test_valid_profile_read_model(client: TestClient):
    """Check that the /profiles/@me endpoint returns data that matches the ProfileRead
    model."""
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    response = client.get(BASE_URL, headers=headers)
    assert response.status_code == 200
    response_json = response.json()
    assert response_json.keys() == ProfileRead(**response_json).dict().keys()


def test_update_profile_all_data(client: TestClient, db: Database):
    """Check that the /profiles/@me endpoint properly handles PUT requests containing
    complete data."""
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    current_data = client.get(BASE_URL, headers=headers).json()
    current_profile = db.profiles.find_one()
    assert current_profile
    new_data = {"name": "John", "content": "New content"}
    response = client.put(BASE_URL, headers=headers, json=new_data)
    assert response.status_code == 200
    res_json = response.json()
    assert res_json == {**current_data, **new_data}
    new_profile = db.profiles.find_one()
    assert new_profile
    assert new_profile == {**current_profile, **new_data}


def test_update_profile_partial_data(client: TestClient, db: Database):
    """Check that the /profiles/@me endpoint properly handles PUT requests containing
    partial data."""
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    current_data = client.get(BASE_URL, headers=headers).json()
    current_profile = db.profiles.find_one()
    assert current_profile
    new_data = {"content": "New content"}
    response = client.put(BASE_URL, headers=headers, json=new_data)
    assert response.status_code == 200
    res_json = response.json()
    assert res_json == {**current_data, **new_data}
    new_profile = db.profiles.find_one()
    assert new_profile
    assert new_profile == {**current_profile, **new_data}
