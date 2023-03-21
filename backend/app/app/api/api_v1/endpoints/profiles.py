from fastapi import APIRouter, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload
from app.schemas.profile import ProfileRead

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.get("/@me", response_model=ProfileRead)
def read_current_profile(token: Payload = Depends(verify_token)):
    ...


@router.put("/@me", response_model=ProfileRead)
def update_current_profile(token: Payload = Depends(verify_token)):
    ...
