from fastapi import APIRouter, Path, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload
from app.schemas.contact import ContactRead, ContactCreate, ContactUpdate
from app.schemas.message import Message
from app.crud.contact import crud_contact

router = APIRouter(prefix="/profiles", tags=["contacts"])


@router.post("/@me/contacts", response_model=ContactRead)
def create_current_contact(
    token: Payload = Depends(verify_token), *, contact: ContactCreate
):
    return crud_contact.create(token["sub"], contact)


@router.get("/@me/contacts", response_model=list[ContactRead])
def read_current_contacts(token: Payload = Depends(verify_token)):
    return crud_contact.read_many(token["sub"])


@router.get("/@me/contacts/{id}", response_model=ContactRead)
def read_current_contact(
    token: Payload = Depends(verify_token), id: str = Path(..., title="Contact ID")
):
    return crud_contact._get_by_id(token["sub"], id)


@router.put("/@me/contacts/{id}", response_model=ContactRead)
def update_current_contact(
    token: Payload = Depends(verify_token),
    id: str = Path(..., title="Contact ID"),
    *,
    contact: ContactUpdate
):
    return crud_contact.update(token["sub"], id, contact)


@router.delete("/@me/contacts/{id}", response_model=Message)
def delete_current_contact(
    token: Payload = Depends(verify_token), id: str = Path(..., title="Contact ID")
):
    return crud_contact.delete(token["sub"], id)
