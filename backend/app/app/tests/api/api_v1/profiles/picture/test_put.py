import os
import io

from fastapi.testclient import TestClient
from dotenv import load_dotenv
import requests

from app.schemas.profile import ProfileRead

load_dotenv()

BASE_URL = "/profiles/@me/picture"
ACCESS_TOKEN = os.getenv("TEST_AUTH0_ACCESS_TOKEN", "")
PICTURE_URL = "https://avatars.githubusercontent.com/u/10673?v=4"


def test_valid_access_token_required(client: TestClient):
    """Check that a valid access token is required to access the /profiles/@me/picture
    endpoint."""
    response = client.put(BASE_URL)
    assert response.status_code == 403


def test_valid_access_token_provided(client: TestClient):
    """Check that the /profiles/@me/picture endpoint can be accessed with a valid access
    token."""
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    response = client.put(BASE_URL, headers=headers)
    assert response.status_code != 403


def test_invalid_access_token_provided(client: TestClient):
    """Check that an authorization error is returned when accessing the
    /profiles/@me/picture endpoint with an invalid access token."""
    headers = {"Authorization": "Bearer INVALID_ACCESS_TOKEN"}
    response = client.put(BASE_URL, headers=headers)
    assert response.status_code == 401


def test_valid_profile_read_model(client: TestClient):
    """Check that the /profiles/@me/picture endpoint returns data that matches the
    ProfileRead model."""
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    pic_res = requests.get(PICTURE_URL)
    pic_bytes = io.BytesIO(pic_res.content)
    files = {"picture": pic_bytes}
    response = client.put(BASE_URL, headers=headers, files=files)
    assert response.status_code == 200
    response_json = response.json()
    assert response_json.keys() == ProfileRead(**response_json).dict().keys()


def test_update_profile_picture(client: TestClient):
    """Test updating the profile picture for the current user."""
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    current_data = client.get(BASE_URL.removesuffix("/picture"), headers=headers).json()
    pic_res = requests.get(PICTURE_URL)
    pic_bytes = io.BytesIO(pic_res.content)
    files = {"picture": pic_bytes}
    response = client.put(BASE_URL, headers=headers, files=files)
    assert response.status_code == 200
    res_json = response.json()
    current_data.pop("picture_url")
    res_json.pop("picture_url")
    assert res_json == current_data
