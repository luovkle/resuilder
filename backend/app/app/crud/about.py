from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from pymongo.database import Database
from app.schemas.about import AboutUpdate, About


class CRUDAbout:
    def _get_by_user(self, db: Database, user: str):
        doc = db.abouts.find_one({"user": user})
        if not doc:
            about_db = jsonable_encoder(About.parse_obj({"user": user}))
            doc = db.abouts.find_one_and_update(
                {"user": user},
                {"$setOnInsert": about_db},
                upsert=True,
                return_document=True,
            )
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def read(self, db: Database, user: str):
        return self._get_by_user(db, user)

    def update(self, db: Database, user: str, about: AboutUpdate):
        doc = self._get_by_user(db, user)
        changes = db.abouts.update_one(
            {"_id": doc["_id"]}, {"$set": about.dict(exclude_none=True)}
        ).modified_count
        return self._get_by_user(db, user) if changes else doc


crud_about = CRUDAbout()
