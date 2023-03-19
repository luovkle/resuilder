from fastapi import APIRouter, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload
from app.schemas.skills import SkillsRead

router = APIRouter(prefix="/profiles", tags=["skills"])


@router.get("/@me/skills", response_model=list[SkillsRead])
def read_current_skills(token: Payload = Depends(verify_token)):
    ...


@router.put("/@me/skills", response_model=SkillsRead)
def update_current_skills(token: Payload = Depends(verify_token)):
    ...
