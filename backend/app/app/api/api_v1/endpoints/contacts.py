from fastapi import APIRouter, Path, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload

router = APIRouter(prefix="/profiles", tags=["contacts"])


@router.post("/@me/contacts/")
def create_current_contact(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/contacts")
def read_current_contacts(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/contacts/{id}")
def read_current_contact(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Contact ID")
):
    ...


@router.put("/@me/contacts/{id}")
def update_current_contact(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Contact ID")
):
    ...


@router.delete("/@me/contacts/{id}")
def delete_current_contact(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Contact ID")
):
    ...
