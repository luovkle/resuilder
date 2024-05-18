from typing import Annotated

from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.api.deps import get_current_account, get_current_user, get_db
from app.crud.contact_method import cleanup_contact_methods
from app.crud.job import cleanup_jobs
from app.crud.profile import cleanup_profile, setup_profile
from app.crud.resume import create_resume, delete_resume, read_resume, update_resume
from app.schemas.message import Message
from app.schemas.resume import ResumeRead, ResumeUpdate

router = APIRouter()


@router.post("/@me", response_model=ResumeRead)
def create_resume_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
    current_account: Annotated[str, Depends(get_current_account)],
):
    setup_profile(db, current_user, current_account)
    return create_resume(db, current_user)


@router.get("/@me", response_model=ResumeRead)
def read_resume_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
):
    return read_resume(db, current_user)


@router.patch("/@me", response_model=ResumeRead)
def update_resume_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
    new_data: ResumeUpdate,
):
    return update_resume(db, current_user, new_data)


@router.delete("/@me", response_model=Message)
def delete_resume_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
):
    cleanup_profile(db, current_user)
    cleanup_contact_methods(db, current_user)
    cleanup_jobs(db, current_user)
    return delete_resume(db, current_user)
