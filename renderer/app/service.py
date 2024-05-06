from flask import abort
from pymongo.database import Database

from app.schemas import About, Contact, Position, Profile, Repository, Skill


def get_collections() -> list[dict]:
    return [
        {
            "internal_name": "abouts",
            "external_name": "about",
            "many": False,
            "schema": About,
        },
        {
            "internal_name": "contacts",
            "external_name": "contacts",
            "many": True,
            "schema": Contact,
        },
        {
            "internal_name": "positions",
            "external_name": "positions",
            "many": True,
            "schema": Position,
        },
        {
            "internal_name": "profiles",
            "external_name": "profile",
            "many": False,
            "schema": Profile,
        },
        {
            "internal_name": "repositories",
            "external_name": "repositories",
            "many": True,
            "schema": Repository,
        },
        {
            "internal_name": "skills",
            "external_name": "skills",
            "many": True,
            "schema": Skill,
        },
    ]


def get_user_by_nickname(db: Database, nickname: str) -> str:
    doc = db.profiles.find_one({"nickname": nickname})
    if not doc:
        abort(404)
    return doc["user"]


def get_collection_by_user(
    db: Database,
    coll_name: str,
    user: str,
    many: bool = True,
):
    search = {"user": user}
    coll = db[coll_name]
    doc = list(coll.find(search)) if many else coll.find_one(search)
    if not doc:
        abort(404)
    return doc


def get_user_data(db: Database, nickname: str) -> dict:
    user = get_user_by_nickname(db, nickname)
    user_data = {}
    for collection in get_collections():
        collection_data = get_collection_by_user(
            db, collection["internal_name"], user, collection["many"]
        )
        # Many elements
        if type(collection_data) is list:
            collection_data = [
                collection["schema"](**element).model_dump()
                for element in collection_data
            ]
        # Single element
        else:
            collection_data = collection["schema"](**collection_data).model_dump()
        user_data.update({collection["external_name"]: collection_data})
    return user_data
