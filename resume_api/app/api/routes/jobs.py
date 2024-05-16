from fastapi import APIRouter, UploadFile

from app.schemas.job import (
    JobCreate,
    JobRead,
    JobUpdate,
)
from app.schemas.message import Message

router = APIRouter()


@router.post("/@me", response_model=JobRead)
def create_job_current_user(new_job: JobCreate): ...


@router.get("/@me", response_model=list[JobRead])
def read_jobs_current_user(): ...


@router.patch("/@me/{id}", response_model=JobRead)
def update_job_current_user(id: str, new_data: JobUpdate): ...


@router.delete("/@me/{id}", response_model=Message)
def delete_job_current_user(id: str): ...


@router.put("/@me/{id}/picture", response_model=JobRead)
def update_job_picture_current_user(id: str, new_picture: UploadFile): ...
