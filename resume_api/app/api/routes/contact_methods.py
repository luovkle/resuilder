from typing import Annotated

from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.api.deps import get_current_user, get_db
from app.crud.contact_method import (
    create_contact_method,
    read_contact_methods,
    update_contact_method,
    delete_contact_method,
)
from app.schemas.contact_method import (
    ContactMethodCreate,
    ContactMethodRead,
    ContactMethodUpdate,
)
from app.schemas.message import Message

router = APIRouter()


@router.post("/@me", response_model=ContactMethodRead)
def create_contact_method_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
    new_contact_method: ContactMethodCreate,
):
    return create_contact_method(db, current_user, new_contact_method)


@router.get("/@me", response_model=list[ContactMethodRead])
def read_contact_methods_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
):
    return read_contact_methods(db, current_user)


@router.patch("/@me/{id}", response_model=ContactMethodRead)
def update_contact_method_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
    id: str,
    new_data: ContactMethodUpdate,
):
    return update_contact_method(db, current_user, id, new_data)


@router.delete("/@me/{id}", response_model=Message)
def delete_contact_method_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
    id: str,
):
    return delete_contact_method(db, current_user, id)
