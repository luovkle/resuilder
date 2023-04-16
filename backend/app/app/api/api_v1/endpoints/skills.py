from fastapi import APIRouter, Depends, Path
from pymongo.database import Database

from app.api.deps import verify_token, get_db
from app.schemas.payload import Payload
from app.schemas.message import Message

from app.schemas.skill import SkillCreate, SkillRead, SkillUpdate
from app.crud.skill import crud_skill

router = APIRouter(prefix="/profiles", tags=["skills"])


@router.post("/@me/skills", response_model=SkillRead)
def create_skill(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    *,
    skill: SkillCreate
):
    return crud_skill.create(db, token["sub"], skill)


@router.get("/@me/skills", response_model=list[SkillRead])
def read_current_skills(
    token: Payload = Depends(verify_token), db: Database = Depends(get_db)
):
    return crud_skill.read_many(db, token["sub"])


@router.get("/@me/skills/{id}", response_model=SkillRead)
def read_current_skill(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    id: str = Path(..., title="Skill ID"),
):
    return crud_skill.read_one(db, token["sub"], id)


@router.put("/@me/skills/{id}", response_model=SkillRead)
def update_current_skills(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    id: str = Path(..., title="Skill ID"),
    *,
    skill: SkillUpdate
):
    return crud_skill.update(db, token["sub"], id, skill)


@router.delete("/@me/skills/{id}", response_model=Message)
def delete_current_skill(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    id: str = Path(..., title="Skill ID"),
):
    return crud_skill.delete(db, token["sub"], id)
