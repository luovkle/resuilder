from fastapi import APIRouter, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload
from app.schemas.profile import ProfileRead
from app.schemas.message import Message

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.post("", response_model=ProfileRead)
def create_profile(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me", response_model=ProfileRead)
def read_current_profile(token: Payload = Depends(verify_token)):
    ...


@router.put("/@me", response_model=ProfileRead)
def update_current_profile(token: Payload = Depends(verify_token)):
    ...


@router.delete("/@me", response_model=Message)
def delete_current_profile(token: Payload = Depends(verify_token)):
    ...
