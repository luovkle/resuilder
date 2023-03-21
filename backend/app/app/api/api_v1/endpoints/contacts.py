from fastapi import APIRouter, Path, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload
from app.schemas.contact import ContactRead
from app.schemas.message import Message

router = APIRouter(prefix="/profiles", tags=["contacts"])


@router.post("/@me/contacts", response_model=ContactRead)
def create_current_contact(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/contacts", response_model=list[ContactRead])
def read_current_contacts(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/contacts/{id}", response_model=ContactRead)
def read_current_contact(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Contact ID")
):
    ...


@router.put("/@me/contacts/{id}", response_model=ContactRead)
def update_current_contact(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Contact ID")
):
    ...


@router.delete("/@me/contacts/{id}", response_model=Message)
def delete_current_contact(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Contact ID")
):
    ...
