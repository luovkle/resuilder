import os

from fastapi.testclient import TestClient
from dotenv import load_dotenv

from app.schemas.profile import ProfileRead

load_dotenv()

BASE_URL = "/profiles/@me"
ACCESS_TOKEN = os.getenv("TEST_AUTH0_ACCESS_TOKEN", "")


def test_valid_access_token_required(client: TestClient):
    """Check that a valid access token is required to access the /profiles/@me
    endpoint."""
    response = client.get(BASE_URL)
    assert response.status_code == 403


def test_valid_access_token_provided(client: TestClient):
    """Check that the /profiles/@me endpoint can be accessed with a valid access
    token."""
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    response = client.get(BASE_URL, headers=headers)
    assert response.status_code == 200


def test_invalid_access_token_provided(client: TestClient):
    """Check that an authorization error is returned when accessing the /profiles/@me
    endpoint with an invalid access token."""
    headers = {"Authorization": "Bearer INVALID_ACCESS_TOKEN"}
    response = client.get(BASE_URL, headers=headers)
    assert response.status_code == 401


def test_response_data(client: TestClient):
    """Check that the data returned by the /profiles/@me endpoint is valid."""
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    response = client.get(BASE_URL, headers=headers)
    assert response.status_code == 200
    response_json = response.json()
    assert response_json.keys() == ProfileRead(**response_json).dict().keys()
