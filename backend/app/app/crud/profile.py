from fastapi import HTTPException, status

from app.db.client import client
from app.schemas.profile import ProfileUpdate
from app.utils.profile import get_data

db = client.resuilder
col = db.profiles


class CRUDProfile:
    def _get_by_user(self, user: str, access_token: str):
        doc = col.find_one({"user": user})
        if not doc:
            data = get_data(access_token)
            if not data:
                raise HTTPException(status.HTTP_404_NOT_FOUND)
            id = col.insert_one(
                {
                    "user": user,
                    "name": data["name"],
                    "content": "",
                    "url": data["picture"],
                }
            ).inserted_id
            doc = col.find_one({"_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def read(self, user: str, access_token: str):
        return self._get_by_user(user, access_token)

    def update(self, user: str, access_token, profile: ProfileUpdate):
        doc = self._get_by_user(user, access_token)
        changes = col.update_one(
            {"_id": doc["_id"], "user": doc["user"]},
            {"$set": profile.dict(exclude_none=True)},
        ).modified_count
        return self._get_by_user(user, access_token) if changes else doc


crud_profile = CRUDProfile()
