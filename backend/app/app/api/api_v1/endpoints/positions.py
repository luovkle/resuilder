from fastapi import APIRouter, Path, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload
from app.schemas.position import PositionRead
from app.schemas.message import Message

router = APIRouter(prefix="/profiles", tags=["positions"])


@router.post("/@me/positions", response_model=PositionRead)
def create_position(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/positions", response_model=list[PositionRead])
def read_current_positions(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/positions/{id}", response_model=PositionRead)
def read_current_position(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Position ID")
):
    ...


@router.put("/@me/positions/{id}", response_model=PositionRead)
def update_current_position(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Position ID")
):
    ...


@router.delete("/@me/positions/{id}", response_model=Message)
def delete_current_position(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Position ID")
):
    ...
