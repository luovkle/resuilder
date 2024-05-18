from fastapi import HTTPException, status
from pymongo.database import Database

from app.schemas.profile import ProfileDB, ProfileUpdate


def create_profile(db: Database, user_id: str, name: str) -> dict:
    if db.profiles.find_one({"user_id": user_id}):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Profile already exists",
        )
    new_profile_obj = ProfileDB(user_id=user_id, name=name)
    result = db.profiles.insert_one(new_profile_obj.model_dump(by_alias=True))
    doc = db.profiles.find_one({"_id": result.inserted_id})
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve the created profile",
        )
    return doc


def read_profile(db: Database, user_id: str) -> dict:
    doc = db.profiles.find_one({"user_id": user_id})
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    return doc


def update_profile(db: Database, user_id: str, new_data: ProfileUpdate) -> dict:
    update_data = new_data.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid data provided for update",
        )
    result = db.profiles.update_one({"user_id": user_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No changes made to the profile",
        )
    updated_doc = db.profiles.find_one({"user_id": user_id})
    if not updated_doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve updated profile",
        )
    return updated_doc


def delete_profile(db: Database, user_id: str) -> dict:
    result = db.profiles.delete_one({"user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    return {"msg": "Profile deleted successfully"}
