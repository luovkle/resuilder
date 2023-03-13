from fastapi import APIRouter, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload
from app.schemas.skill import SkillRead

router = APIRouter(prefix="/profiles", tags=["skills"])


@router.get("/@me/skills", response_model=list[SkillRead])
def read_current_skills(token: Payload = Depends(verify_token)):
    ...


@router.put("/@me/skills", response_model=SkillRead)
def update_current_skills(token: Payload = Depends(verify_token)):
    ...
