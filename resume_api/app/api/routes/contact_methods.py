from typing import Annotated

from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.schemas.contact_method import (
    ContactMethodCreate,
    ContactMethodRead,
    ContactMethodUpdate,
)
from app.schemas.message import Message
from app.api.deps import get_db

router = APIRouter()


@router.post("/@me", response_model=ContactMethodRead)
def create_contact_method_current_user(
    db: Annotated[Database, Depends(get_db)],
    new_contact_method: ContactMethodCreate,
): ...


@router.get("/@me", response_model=list[ContactMethodRead])
def read_contact_methods_current_user(
    db: Annotated[Database, Depends(get_db)],
): ...


@router.patch("/@me/{id}", response_model=ContactMethodRead)
def update_contact_method_current_user(
    db: Annotated[Database, Depends(get_db)],
    id: str,
    new_data: ContactMethodUpdate,
): ...


@router.delete("/@me/{id}", response_model=Message)
def delete_contact_method_current_user(
    db: Annotated[Database, Depends(get_db)],
    id: str,
): ...
