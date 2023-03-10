from fastapi import APIRouter, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload
from app.schemas.about import AboutRead

router = APIRouter(prefix="/profiles", tags=["about"])


@router.get("/@me/about", response_model=AboutRead)
def read_current_about(token: Payload = Depends(verify_token)):
    ...


@router.put("/@me/about", response_model=AboutRead)
def update_current_about(token: Payload = Depends(verify_token)):
    ...
