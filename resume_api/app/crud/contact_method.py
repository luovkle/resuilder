from fastapi import HTTPException, status
from pymongo.database import Database

from app.schemas.contact_method import (
    ContactMethodDB,
    ContactMethodCreate,
    ContactMethodUpdate,
)


def create_contact_method(
    db: Database, user_id: str, contact_method: ContactMethodCreate
) -> dict:
    resume_exists = db.resumes.find_one({"user_id": user_id})
    if not resume_exists:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User must have a resume to create a contact method",
        )
    new_contact_method = ContactMethodDB(
        **contact_method.model_dump(by_alias=True), user_id=user_id
    )
    result = db.contact_methods.insert_one(new_contact_method.model_dump(by_alias=True))
    doc = db.contact_methods.find_one({"_id": result.inserted_id})
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve the created contact method",
        )
    return doc


def read_contact_methods(db: Database, user_id: str) -> list:
    docs = list(db.contact_methods.find({"user_id": user_id}))
    if not docs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No contact methods found for this user",
        )
    return docs


def update_contact_method(
    db: Database, user_id: str, contact_id: str, new_data: ContactMethodUpdate
) -> dict:
    update_data = new_data.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid data provided for update",
        )
    result = db.contact_methods.update_one(
        {"_id": contact_id, "user_id": user_id}, {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact method not found",
        )
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No changes made to the contact method",
        )
    updated_doc = db.contact_methods.find_one({"_id": contact_id, "user_id": user_id})
    if not updated_doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve updated contact method",
        )
    return updated_doc


def delete_contact_method(db: Database, user_id: str, contact_id: str) -> dict:
    result = db.contact_methods.delete_one({"_id": contact_id, "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact method not found",
        )
    return {"msg": "Contact method deleted successfully"}


def delete_all_contact_methods(db: Database, user_id: str) -> dict:
    result = db.contact_methods.delete_many({"user_id": user_id})
    if result.deleted_count == 0:
        return {"msg": "No contact methods found for the specified user"}
    return {"msg": f"All contact methods for user {user_id} deleted successfully"}
