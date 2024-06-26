from fastapi import APIRouter

from app.schemas import Url
from app.service import generate_resume

router = APIRouter(prefix="/pdf", tags=["PDF"])


@router.post("/{user}", response_model=Url)
async def generate_resume_pdf(user: str):
    return await generate_resume(user)
