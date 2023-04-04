from fastapi import APIRouter, Path, Depends, UploadFile
from pymongo.database import Database

from app.api.deps import verify_token, get_db
from app.schemas.payload import Payload
from app.schemas.position import PositionCreate, PositionRead, PositionUpdate
from app.schemas.message import Message
from app.crud.position import crud_position

router = APIRouter(prefix="/profiles", tags=["positions"])


@router.post("/@me/positions", response_model=PositionRead)
def create_position(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    *,
    position: PositionCreate,
):
    return crud_position.create(db, token["sub"], position)


@router.get("/@me/positions", response_model=list[PositionRead])
def read_current_positions(
    token: Payload = Depends(verify_token), db: Database = Depends(get_db)
):
    return crud_position.read_many(db, token["sub"])


@router.get("/@me/positions/{id}", response_model=PositionRead)
def read_current_position(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    id: str = Path(..., title="Position ID"),
):
    return crud_position.read_one(db, token["sub"], id)


@router.put("/@me/positions/{id}", response_model=PositionRead)
def update_current_position(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    id: str = Path(..., title="Position ID"),
    *,
    position: PositionUpdate,
):
    return crud_position.update(db, token["sub"], id, position)


@router.put("/@me/positions/{id}/picture", response_model=PositionRead)
def update_current_picture(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    id: str = Path(..., title="Position ID"),
    *,
    picture: UploadFile,
):
    return crud_position.update_picture(db, token["sub"], id, picture)


@router.delete("/@me/positions/{id}", response_model=Message)
def delete_current_position(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    id: str = Path(..., title="Position ID"),
):
    return crud_position.delete(db, token["sub"], id)
