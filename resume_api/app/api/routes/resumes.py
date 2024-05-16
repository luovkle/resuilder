from typing import Annotated

from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.api.deps import get_db
from app.schemas.message import Message
from app.schemas.resume import ResumeRead, ResumeUpdate

router = APIRouter()


@router.post("/@me", response_model=ResumeRead)
def create_resume_current_user(
    db: Annotated[Database, Depends(get_db)],
): ...


@router.get("/@me", response_model=ResumeRead)
def read_resume_current_user(
    db: Annotated[Database, Depends(get_db)],
): ...


@router.patch("/@me", response_model=ResumeRead)
def update_resume_current_user(
    db: Annotated[Database, Depends(get_db)],
    new_data: ResumeUpdate,
): ...


@router.delete("/@me", response_model=Message)
def delete_resume_current_user(
    db: Annotated[Database, Depends(get_db)],
): ...
