from fastapi import APIRouter, Path, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload

router = APIRouter(prefix="/profiles", tags=["positions"])


@router.post("/@me/positions")
def create_position(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/positions")
def read_current_positions(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/positions/{id}")
def read_current_position(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Position ID")
):
    ...


@router.put("/@me/positions/{id}")
def update_current_position(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Position ID")
):
    ...


@router.delete("/@me/positions/{id}")
def delete_current_position(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Position ID")
):
    ...
