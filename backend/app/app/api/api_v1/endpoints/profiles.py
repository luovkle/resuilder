from fastapi import APIRouter

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.post("")
def create_profile():
    ...


@router.get("/@me")
def read_current_profile():
    ...


@router.put("/@me")
def update_current_profile():
    ...


@router.delete("/@me")
def delete_current_profile():
    ...
