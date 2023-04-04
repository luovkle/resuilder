from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from pymongo.database import Database

from app.schemas.contact import ContactCreate, ContactUpdate, Contact
from app.core.config import settings


class CRUDContact:
    def _get_by_user(self, db: Database, user: str):
        return list(
            db.contacts.find({"user": user}).limit(settings.CRUD_CONTACTS_LIMIT)
        )

    def _get_by_id(self, db: Database, user: str, id: str):
        doc = db.contacts.find_one({"user": user, "_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def _allow_new_doc(self, db: Database, user: str):
        return (
            False
            if db.contacts.count_documents({"user": user})
            >= settings.CRUD_CONTACTS_LIMIT
            else True
        )

    def create(self, db: Database, user: str, contact: ContactCreate):
        if not self._allow_new_doc(db, user):
            raise HTTPException(
                status.HTTP_403_FORBIDDEN, "Maximum number of elements reached"
            )
        contact_db = jsonable_encoder(Contact.parse_obj(contact))
        id = db.contacts.insert_one({"user": user, **contact_db}).inserted_id
        return self._get_by_id(db, user, id)

    def read_one(self, db: Database, user: str, id: str):
        return self._get_by_id(db, user, id)

    def read_many(self, db: Database, user: str):
        return self._get_by_user(db, user)

    def update(self, db: Database, user: str, id: str, contact: ContactUpdate):
        doc = self._get_by_id(db, user, id)
        changes = db.contacts.update_one(
            {"user": user, "_id": doc["_id"]}, {"$set": contact.dict(exclude_none=True)}
        ).modified_count
        return self._get_by_id(db, user, id) if changes else doc

    def delete(self, db: Database, user: str, id: str):
        doc = self._get_by_id(db, user, id)
        db.contacts.delete_one({"user": user, "_id": doc["_id"]})
        return {"msg": "ok"}


crud_contact = CRUDContact()
