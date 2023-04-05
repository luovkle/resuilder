from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.api.deps import verify_token, get_db
from app.schemas.payload import Payload
from app.schemas.skills import SkillsRead, SkillsUpdate
from app.crud.skills import crud_skills

router = APIRouter(prefix="/profiles", tags=["skills"])


@router.get("/@me/skills", response_model=SkillsRead)
def read_current_skills(
    token: Payload = Depends(verify_token), db: Database = Depends(get_db)
):
    return crud_skills.read(db, token["sub"])


@router.put("/@me/skills", response_model=SkillsRead)
def update_current_skills(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    *,
    skills: SkillsUpdate
):
    return crud_skills.update(db, token["sub"], skills)
