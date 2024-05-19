from typing import Annotated

from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.api.deps import get_current_user, get_db
from app.crud.profile import read_profile, update_profile
from app.schemas.profile import ProfileRead, ProfileUpdate

router = APIRouter()


@router.get("/@me", response_model=ProfileRead)
def read_profile_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
):
    return read_profile(db, current_user)


@router.patch("/@me", response_model=ProfileRead)
def update_profile_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
    new_data: ProfileUpdate,
):
    return update_profile(db, current_user, new_data)
