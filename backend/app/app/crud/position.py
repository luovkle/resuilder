from fastapi import HTTPException, UploadFile, status
from fastapi.encoders import jsonable_encoder

from app.schemas.position import PositionCreate, PositionUpdate, Position
from app.core.config import settings
from app.db.client import client
from app.utils.picture import update_picture

db = client.resuilder
col = db.positions


class CRUDPosition:
    def _get_by_user(self, user: str):
        return list(col.find({"user": user}).limit(settings.CRUD_POSITIONS_LIMIT))

    def _get_by_id(self, user: str, id: str):
        doc = col.find_one({"user": user, "_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def _allow_new_doc(self, user: str):
        return (
            False
            if col.count_documents({"user": user}) >= settings.CRUD_POSITIONS_LIMIT
            else True
        )

    def create(self, user: str, position: PositionCreate):
        if not self._allow_new_doc(user):
            raise HTTPException(
                status.HTTP_403_FORBIDDEN, "Maximum number of elements reached"
            )
        position_db = jsonable_encoder(Position.parse_obj(position))
        id = col.insert_one({"user": user, **position_db}).inserted_id
        return self._get_by_id(user, id)

    def read_one(self, user: str, id: str):
        return self._get_by_id(user, id)

    def read_many(self, user: str):
        return self._get_by_user(user)

    def update(self, user: str, id: str, position: PositionUpdate):
        doc = self._get_by_id(user, id)
        changes = col.update_one(
            {"user": user, "_id": doc["_id"]},
            {"$set": position.dict(exclude_none=True)},
        ).modified_count
        return self._get_by_id(user, id) if changes else doc

    def update_picture(self, user: str, id: str, picture: UploadFile):
        doc = self._get_by_id(user, id)
        res = update_picture(picture, doc["picture_id"])
        if res.get("error"):
            raise HTTPException(status.HTTP_400_BAD_REQUEST, res["error"])
        url = res["secure_url"]
        changes = col.update_one(
            {"user": user, "_id": doc["_id"]},
            {"$set": {"picture_url": url}},
        ).modified_count
        return self._get_by_id(user, id) if changes else doc

    def delete(self, user: str, id: str):
        doc = self._get_by_id(user, id)
        col.delete_one({"user": user, "_id": doc["_id"]})
        return {"msg": "ok"}


crud_position = CRUDPosition()
