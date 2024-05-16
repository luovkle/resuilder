from fastapi import APIRouter

from app.schemas.message import Message
from app.schemas.resume import ResumeUpdate, ResumeRead

router = APIRouter()


@router.post("/@me", response_model=ResumeRead)
def create_resume_current_user(): ...


@router.get("/@me", response_model=ResumeRead)
def read_resume_current_user(): ...


@router.patch("/@me", response_model=ResumeRead)
def update_resume_current_user(new_data: ResumeUpdate): ...


@router.delete("/@me", response_model=Message)
def delete_resume_current_user(): ...
