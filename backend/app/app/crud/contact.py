from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder

from app.db.client import client
from app.schemas.contact import ContactCreate, ContactUpdate, Contact
from app.core.config import settings

db = client.resuilder
col = db.contacts


class CRUDContact:
    def _get_by_user(self, user: str):
        return list(col.find({"user": user}).limit(settings.CURD_CONTACTS_LIMIT))

    def _get_by_id(self, user: str, id: str):
        doc = col.find_one({"user": user, "_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def _allow_new_doc(self, user: str):
        return (
            False
            if col.count_documents({"user": user}) >= settings.CURD_CONTACTS_LIMIT
            else True
        )

    def create(self, user: str, contact: ContactCreate):
        if not self._allow_new_doc(user):
            raise HTTPException(
                status.HTTP_403_FORBIDDEN, "Maximum number of elements reached"
            )
        contact_db = jsonable_encoder(Contact.parse_obj(contact))
        id = col.insert_one({"user": user, **contact_db}).inserted_id
        return self._get_by_id(user, id)

    def read_one(self, user: str, id: str):
        return self._get_by_id(user, id)

    def read_many(self, user: str):
        return self._get_by_user(user)

    def update(self, user: str, id: str, contact: ContactUpdate):
        doc = self._get_by_id(user, id)
        col.update_one(
            {"user": user, "_id": doc["_id"]}, {"$set": contact.dict(exclude_none=True)}
        )
        return self._get_by_id(user, id)

    def delete(self, user: str, id: str):
        doc = self._get_by_id(user, id)
        col.delete_one({"user": user, "_id": doc["_id"]})
        return {"msg": "ok"}


crud_contact = CRUDContact()
