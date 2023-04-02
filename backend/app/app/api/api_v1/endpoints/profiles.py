from fastapi import APIRouter, Depends, UploadFile

from app.api.deps import verify_token, get_access_token
from app.schemas.payload import Payload
from app.schemas.profile import ProfileRead, ProfileUpdate
from app.crud.profile import crud_profile

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.get("/@me", response_model=ProfileRead)
def read_current_profile(
    token: Payload = Depends(verify_token),
    access_token: str = Depends(get_access_token),
):
    return crud_profile.read(token["sub"], access_token)


@router.put("/@me", response_model=ProfileRead)
def update_current_profile(
    token: Payload = Depends(verify_token),
    access_token: str = Depends(get_access_token),
    *,
    profile: ProfileUpdate
):
    return crud_profile.update(token["sub"], access_token, profile)


@router.put("/@me/picture", response_model=ProfileRead)
def update_current_picture(
    token: Payload = Depends(verify_token),
    access_token: str = Depends(get_access_token),
    *,
    picture: UploadFile
):
    return crud_profile.update_picture(token["sub"], access_token, picture)
