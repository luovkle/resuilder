from fastapi import APIRouter, Path

router = APIRouter(prefix="/profiles", tags=["contacts"])


@router.post("/@me/contacts/")
def create_current_contact():
    ...


@router.get("/@me/contacts")
def read_current_contacts():
    ...


@router.get("/@me/contacts/{id}")
def read_current_contact(id: int = Path(..., title="Contact ID")):
    ...


@router.put("/@me/contacts/{id}")
def update_current_contact(id: int = Path(..., title="Contact ID")):
    ...


@router.delete("/@me/contacts/{id}")
def delete_current_contact(id: int = Path(..., title="Contact ID")):
    ...
