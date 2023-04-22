from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from pymongo.database import Database

from app.schemas.repository import Repository, RepositoryUpdate
from app.utils.profile import get_data
from app.utils.repository import get_repositories
from app.core.config import settings


class CRUDRepository:
    def _create_repositories(self, db: Database, user: str, repositories_data: list):
        repositories = []
        for repository in repositories_data:
            repository_db = jsonable_encoder(
                Repository.parse_obj({**repository, "user": user})
            )
            repositories.append(repository_db)
        db.repositories.insert_many(repositories)
        return list(
            db.repositories.find({"user": user}).limit(settings.CRUD_REPOSITORIES_LIMIT)
        )

    def _get_by_user(self, db: Database, user: str, access_token: str):
        doc = list(
            db.repositories.find({"user": user}).limit(settings.CRUD_REPOSITORIES_LIMIT)
        )
        if not doc:
            data = get_data(access_token)
            if not data:
                raise HTTPException(status.HTTP_404_NOT_FOUND)
            nickname = data["nickname"]
            repositories_data = get_repositories(
                nickname, settings.CRUD_REPOSITORIES_LIMIT
            )
            if not repositories_data:
                return []
            doc = self._create_repositories(db, user, repositories_data)
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def _get_by_id(self, db: Database, user: str, id: str):
        doc = db.repositories.find_one({"user": user, "_id": id})
        if not doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return doc

    def read_one(self, db: Database, user: str, id: str):
        return self._get_by_id(db, user, id)

    def read_many(self, db: Database, user: str, access_token: str):
        return self._get_by_user(db, user, access_token)

    def update(self, db: Database, user: str, id: str, repository: RepositoryUpdate):
        doc = self._get_by_id(db, user, id)
        changes = db.repositories.update_one(
            {"_id": doc["_id"], "user": doc["user"]},
            {"$set": repository.dict(exclude_none=True)},
        ).modified_count
        return self._get_by_id(db, user, id) if changes else doc


crud_repository = CRUDRepository()
