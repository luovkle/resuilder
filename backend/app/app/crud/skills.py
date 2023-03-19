from fastapi import HTTPException, status

from app.db.client import client
from app.schemas.skills import SkillsUpdate

db = client.resuilder
col = db.skills


class CRUDSkills:
    def _get_by_user(self, user: str):
        doc = col.find_one({"user": user})
        if not doc:
            id = col.insert_one({"user": user, "skills": []}).inserted_id
            doc = col.find_one({"_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def read(self, user: str):
        return self._get_by_user(user)

    def update(self, user: str, skills: SkillsUpdate):
        doc = self._get_by_user(user)
        col.update_one({"_id": doc["_id"]}, {"$set": skills.dict(exclude_none=True)})
        return self._get_by_user(user)


crud_skills = CRUDSkills()
