from fastapi import APIRouter, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload

router = APIRouter(prefix="/profiles", tags=["skills"])


@router.get("/@me/skills")
def read_current_skills(token: Payload = Depends(verify_token)):
    ...


@router.put("/@me/skills")
def update_current_skills(token: Payload = Depends(verify_token)):
    ...
