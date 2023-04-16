from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from pymongo.database import Database

from app.schemas.skill import Skill, SkillCreate, SkillUpdate


class CRUDSkill:
    def _get_by_user(self, db: Database, user: str):
        return list(db.skills.find({"user": user}))

    def _get_by_id(self, db: Database, user: str, id: str):
        doc = db.skills.find_one({"user": user, "_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def create(self, db: Database, user: str, skill: SkillCreate):
        position_db = jsonable_encoder(Skill.parse_obj(skill))
        id = db.skills.insert_one({"user": user, **position_db}).inserted_id
        return self._get_by_id(db, user, id)

    def read_one(self, db: Database, user: str, id: str):
        return self._get_by_id(db, user, id)

    def read_many(self, db: Database, user: str):
        return self._get_by_user(db, user)

    def update(self, db: Database, user: str, id: str, skill: SkillUpdate):
        doc = self._get_by_id(db, user, id)
        changes = db.skills.update_one(
            {"user": user, "_id": id},
            {"$set": skill.dict(exclude_none=True)},
        ).modified_count
        return self._get_by_id(db, user, id) if changes else doc

    def delete(self, db: Database, user: str, id: str):
        doc = self._get_by_id(db, user, id)
        db.skills.delete_one({"user": user, "_id": doc["_id"]})
        return {"msg": "ok"}


crud_skill = CRUDSkill()
