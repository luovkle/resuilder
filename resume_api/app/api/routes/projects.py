from typing import Annotated

from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.api.deps import get_db
from app.schemas.project import ProjectRead, ProjectUpdate

router = APIRouter()


@router.get("/@me", response_model=list[ProjectRead])
def read_projects_current_user(
    db: Annotated[Database, Depends(get_db)],
): ...


@router.patch("/@me", response_model=ProjectRead)
def update_project_current_user(
    db: Annotated[Database, Depends(get_db)],
    new_data: ProjectUpdate,
): ...


@router.put("/@me/refresh", response_model=list[ProjectRead])
def update_project_refresh_current_user(
    db: Annotated[Database, Depends(get_db)],
): ...
