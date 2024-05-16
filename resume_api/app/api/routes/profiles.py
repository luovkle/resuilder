from fastapi import APIRouter

from app.schemas.profile import ProfileRead, ProfileUpdate

router = APIRouter()


@router.get("/@me", response_model=ProfileRead)
def read_profile_current_user(): ...


@router.patch("/@me", response_model=ProfileRead)
def update_profile_current_user(new_data: ProfileUpdate): ...
