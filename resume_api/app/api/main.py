from fastapi import APIRouter

from app.api.routes import contact_methods
from app.api.routes import profiles
from app.api.routes import jobs

api_router = APIRouter()
api_router.include_router(
    contact_methods.router, prefix="/contact-methods", tags=["contact-methods"]
)
api_router.include_router(
    profiles.router, prefix="/profiles", tags=["profiles"]
)
api_router.include_router(
    jobs.router, prefix="/jobs", tags=["jobs"]
)
