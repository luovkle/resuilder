from fastapi import APIRouter

router = APIRouter(prefix="/profiles", tags=["about"])


@router.get("/@me/about")
def read_current_about():
    ...


@router.put("/@me/about")
def update_current_about():
    ...
