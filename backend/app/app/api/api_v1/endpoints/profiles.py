from fastapi import APIRouter, Depends, UploadFile
from pymongo.database import Database

from app.api.deps import verify_token, get_access_token, get_db
from app.schemas.payload import Payload
from app.schemas.profile import ProfileRead, ProfileUpdate
from app.crud.profile import crud_profile

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.get("/@me", response_model=ProfileRead)
def read_current_profile(
    token: Payload = Depends(verify_token),
    access_token: str = Depends(get_access_token),
    db: Database = Depends(get_db),
):
    return crud_profile.read(db, token["sub"], access_token)


@router.put("/@me", response_model=ProfileRead)
def update_current_profile(
    token: Payload = Depends(verify_token),
    access_token: str = Depends(get_access_token),
    db: Database = Depends(get_db),
    *,
    profile: ProfileUpdate
):
    return crud_profile.update(db, token["sub"], access_token, profile)


@router.put("/@me/picture", response_model=ProfileRead)
def update_current_picture(
    token: Payload = Depends(verify_token),
    access_token: str = Depends(get_access_token),
    db: Database = Depends(get_db),
    *,
    picture: UploadFile
):
    return crud_profile.update_picture(db, token["sub"], access_token, picture)
