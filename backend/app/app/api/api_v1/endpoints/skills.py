from fastapi import APIRouter, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload
from app.schemas.skills import SkillsRead, SkillsUpdate
from app.crud.skills import crud_skills

router = APIRouter(prefix="/profiles", tags=["skills"])


@router.get("/@me/skills", response_model=SkillsRead)
def read_current_skills(token: Payload = Depends(verify_token)):
    return crud_skills.read(token["sub"])


@router.put("/@me/skills", response_model=SkillsRead)
def update_current_skills(
    token: Payload = Depends(verify_token), *, skills: SkillsUpdate
):
    return crud_skills.update(token["sub"], skills)
