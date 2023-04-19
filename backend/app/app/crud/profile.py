from fastapi import HTTPException, UploadFile, status
from fastapi.encoders import jsonable_encoder
from pymongo.database import Database

from app.schemas.profile import ProfileUpdate, Profile
from app.utils.profile import get_data
from app.utils.picture import update_picture


class CRUDProfile:
    def _create(self, db: Database, user: str, access_token: str):
        data = get_data(access_token)
        if not data:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        profile_db = jsonable_encoder(
            Profile.parse_obj(
                {
                    "user": user,
                    "name": data["name"],
                    "picture_url": data["picture"],
                }
            )
        )
        id = db.profiles.insert_one(profile_db).inserted_id
        doc = db.profiles.find_one({"_id": id})
        return doc

    def _get_by_user(self, db: Database, user: str, access_token: str):
        doc = db.profiles.find_one({"user": user})
        if not doc:
            doc = self._create(db, user, access_token)
            if not doc:
                raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def read(self, db: Database, user: str, access_token: str):
        return self._get_by_user(db, user, access_token)

    def update(
        self, db: Database, user: str, access_token: str, profile: ProfileUpdate
    ):
        doc = self._get_by_user(db, user, access_token)
        changes = db.profiles.update_one(
            {"_id": doc["_id"], "user": doc["user"]},
            {"$set": profile.dict(exclude_none=True)},
        ).modified_count
        return self._get_by_user(db, user, access_token) if changes else doc

    def update_picture(
        self, db: Database, user: str, access_token: str, picture: UploadFile
    ):
        doc = self._get_by_user(db, user, access_token)
        res = update_picture(picture, doc["picture_id"])
        if res.get("error"):
            raise HTTPException(status.HTTP_400_BAD_REQUEST, res["error"])
        url = res["secure_url"]
        changes = db.profiles.update_one(
            {"_id": doc["_id"], "user": doc["user"]},
            {"$set": {"picture_url": url}},
        ).modified_count
        return self._get_by_user(db, user, access_token) if changes else doc


crud_profile = CRUDProfile()
