from fastapi import APIRouter

from app.api.api_v1.endpoints.profiles import router as profiles_router
from app.api.api_v1.endpoints.contacts import router as contacts_router
from app.api.api_v1.endpoints.abouts import router as abouts_router
from app.api.api_v1.endpoints.skills import router as skills_router
from app.api.api_v1.endpoints.positions import router as positions_router
from app.api.api_v1.endpoints.repositories import router as repositories_router
from app.api.api_v1.endpoints.resumes import router as resumes_router

api_router = APIRouter()

api_router.include_router(profiles_router)
api_router.include_router(contacts_router)
api_router.include_router(abouts_router)
api_router.include_router(skills_router)
api_router.include_router(positions_router)
api_router.include_router(repositories_router)
api_router.include_router(resumes_router)
