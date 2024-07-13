from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.schemas import Url
from app.service import generate_resume

router = APIRouter(prefix="/pdf", tags=["PDF"])


@router.post("/{user}", response_model=Url)
async def generate_resume_pdf(
    _: Annotated[str, Depends(get_current_user)],
    user: str,
):
    return await generate_resume(user)
