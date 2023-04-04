from fastapi import HTTPException, status
from pymongo.database import Database
from app.schemas.about import AboutUpdate


class CRUDAbout:
    def _get_by_user(self, db: Database, user: str):
        doc = db.about.find_one({"user": user})
        if not doc:
            id = db.about.insert_one({"user": user, "about": ""}).inserted_id
            doc = db.about.find_one({"_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def read(self, db: Database, user: str):
        return self._get_by_user(db, user)

    def update(self, db: Database, user: str, about: AboutUpdate):
        doc = self._get_by_user(db, user)
        changes = db.about.update_one(
            {"_id": doc["_id"]}, {"$set": about.dict(exclude_none=True)}
        ).modified_count
        return self._get_by_user(db, user) if changes else doc


crud_about = CRUDAbout()
