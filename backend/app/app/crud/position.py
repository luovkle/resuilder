from fastapi import HTTPException, UploadFile, status
from fastapi.encoders import jsonable_encoder
from pymongo.database import Database

from app.schemas.position import PositionCreate, PositionUpdate, Position
from app.core.config import settings
from app.utils.picture import update_picture


class CRUDPosition:
    def _get_by_user(self, db: Database, user: str):
        return list(
            db.positions.find({"user": user}).limit(settings.CRUD_POSITIONS_LIMIT)
        )

    def _get_by_id(self, db: Database, user: str, id: str):
        doc = db.positions.find_one({"user": user, "_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def _allow_new_doc(self, db: Database, user: str):
        return (
            False
            if db.positions.count_documents({"user": user})
            >= settings.CRUD_POSITIONS_LIMIT
            else True
        )

    def create(self, db: Database, user: str, position: PositionCreate):
        if not self._allow_new_doc(db, user):
            raise HTTPException(
                status.HTTP_403_FORBIDDEN, "Maximum number of elements reached"
            )
        position_db = jsonable_encoder(Position.parse_obj(position))
        id = db.positions.insert_one({"user": user, **position_db}).inserted_id
        return self._get_by_id(db, user, id)

    def read_one(self, db: Database, user: str, id: str):
        return self._get_by_id(db, user, id)

    def read_many(self, db: Database, user: str):
        return self._get_by_user(db, user)

    def update(self, db: Database, user: str, id: str, position: PositionUpdate):
        doc = self._get_by_id(db, user, id)
        changes = db.positions.update_one(
            {"user": user, "_id": doc["_id"]},
            {"$set": position.dict(exclude_none=True)},
        ).modified_count
        return self._get_by_id(db, user, id) if changes else doc

    def update_picture(self, db: Database, user: str, id: str, picture: UploadFile):
        doc = self._get_by_id(db, user, id)
        res = update_picture(picture, doc["picture_id"])
        if res.get("error"):
            raise HTTPException(status.HTTP_400_BAD_REQUEST, res["error"])
        url = res["secure_url"]
        changes = db.positions.update_one(
            {"user": user, "_id": doc["_id"]},
            {"$set": {"picture_url": url}},
        ).modified_count
        return self._get_by_id(db, user, id) if changes else doc

    def delete(self, db: Database, user: str, id: str):
        doc = self._get_by_id(db, user, id)
        db.positions.delete_one({"user": user, "_id": doc["_id"]})
        return {"msg": "ok"}


crud_position = CRUDPosition()
