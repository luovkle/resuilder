from fastapi import HTTPException, status
from pymongo.database import Database

from app.schemas.skills import SkillsUpdate


class CRUDSkills:
    def _get_by_user(self, db: Database, user: str):
        doc = db.skills.find_one({"user": user})
        if not doc:
            id = db.skills.insert_one({"user": user, "skills": []}).inserted_id
            doc = db.skills.find_one({"_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def read(self, db: Database, user: str):
        return self._get_by_user(db, user)

    def update(self, db: Database, user: str, skills: SkillsUpdate):
        doc = self._get_by_user(db, user)
        changes = db.skills.update_one(
            {"_id": doc["_id"]}, {"$set": skills.dict(exclude_none=True)}
        ).modified_count
        return self._get_by_user(db, user) if changes else doc


crud_skills = CRUDSkills()
