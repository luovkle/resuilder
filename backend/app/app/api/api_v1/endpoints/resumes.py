import requests
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from app.api.deps import verify_token
from app.schemas.payload import Payload

generator_url = "http://generator:8001/resume/pdf/"

router = APIRouter(prefix="/profiles", tags=["resumes"])


@router.get("/@me/resumes")
def get_resume(
    token: Payload = Depends(verify_token),
):
    user = token["sub"]
    response = requests.get(generator_url + user, stream=True)
    return StreamingResponse(
        response.iter_content(chunk_size=1024),
        media_type="application/pdf",
    )
