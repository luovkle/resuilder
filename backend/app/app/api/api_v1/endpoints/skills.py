from fastapi import APIRouter

router = APIRouter(prefix="/profiles", tags=["skills"])


@router.get("/@me/skills")
def read_current_skills():
    ...


@router.put("/@me/skills")
def update_current_skills():
    ...
