from fastapi import HTTPException, status
from pymongo.database import Database

from app.crud.contact_method import cleanup_contact_methods
from app.crud.profile import cleanup_profile
from app.schemas.resume import ResumeDB, ResumeUpdate


def create_resume(db: Database, user_id: str) -> dict:
    if db.resumes.find_one({"user_id": user_id}):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Resume already exists",
        )
    new_resume_obj = ResumeDB(user_id=user_id)
    result = db.resumes.insert_one(new_resume_obj.model_dump(by_alias=True))
    doc = db.resumes.find_one({"_id": result.inserted_id})
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve the created resume",
        )
    return doc


def read_resume(db: Database, user_id: str) -> dict:
    doc = db.resumes.find_one({"user_id": user_id})
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found",
        )
    return doc


def update_resume(db: Database, user_id: str, new_data: ResumeUpdate) -> dict:
    update_data = new_data.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid data provided for update",
        )
    result = db.resumes.update_one({"user_id": user_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found",
        )
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No changes made to the resume",
        )
    updated_doc = db.resumes.find_one({"user_id": user_id})
    if not updated_doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve updated resume",
        )
    return updated_doc


def delete_resume(db: Database, user_id: str) -> dict:
    result = db.resumes.delete_one({"user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found",
        )
    cleanup_profile(db, user_id)
    cleanup_contact_methods(db, user_id)
    return {"msg": "Resume deleted successfully"}


def check_resume_exists(db: Database, user_id: str):
    resume_exists = db.resumes.find_one({"user_id": user_id})
    if not resume_exists:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User must have a resume to perform this operation",
        )
