from fastapi import HTTPException, status
from app.db.client import client
from app.schemas.about import AboutUpdate

db = client.resuilder
col = db.about


class CRUDAbout:
    def _get_by_user(self, user: str):
        doc = col.find_one({"user": user})
        if not doc:
            id = col.insert_one({"user": user, "about": ""}).inserted_id
            doc = col.find_one({"_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def read(self, user: str):
        return self._get_by_user(user)

    def update(self, user: str, about: AboutUpdate):
        doc = self._get_by_user(user)
        changes = col.update_one(
            {"_id": doc["_id"]}, {"$set": about.dict(exclude_none=True)}
        ).modified_count
        return self._get_by_user(user) if changes else doc


crud_about = CRUDAbout()
