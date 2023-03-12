from fastapi import APIRouter, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.post("")
def create_profile(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me")
def read_current_profile(token: Payload = Depends(verify_token)):
    ...


@router.put("/@me")
def update_current_profile(token: Payload = Depends(verify_token)):
    ...


@router.delete("/@me")
def delete_current_profile(token: Payload = Depends(verify_token)):
    ...
