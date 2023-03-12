from fastapi import APIRouter, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload

router = APIRouter(prefix="/profiles", tags=["about"])


@router.get("/@me/about")
def read_current_about(token: Payload = Depends(verify_token)):
    ...


@router.put("/@me/about")
def update_current_about(token: Payload = Depends(verify_token)):
    ...
