from fastapi import APIRouter

from app.schemas.contact_method import (
    ContactMethodCreate,
    ContactMethodRead,
    ContactMethodUpdate,
)
from app.schemas.message import Message

router = APIRouter()


@router.post("/@me", response_model=ContactMethodRead)
def create_contact_method_current_user(new_contact_method: ContactMethodCreate): ...


@router.get("/@me", response_model=list[ContactMethodRead])
def read_contact_methods_current_user(): ...


@router.patch("/@me/{id}", response_model=ContactMethodRead)
def update_contact_method_current_user(id: str, new_data: ContactMethodUpdate): ...


@router.delete("/@me/{id}", response_model=Message)
def delete_contact_method_current_user(id: str): ...
