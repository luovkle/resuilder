from typing import Annotated

from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.api.deps import get_current_account, get_current_user, get_db
from app.crud.project import read_projects, update_project, update_project_refresh
from app.schemas.account import Account
from app.schemas.project import ProjectRead, ProjectUpdate

router = APIRouter()


@router.get("/@me", response_model=list[ProjectRead])
def read_projects_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
):
    return read_projects(db, current_user)


@router.patch("/@me/{id}", response_model=ProjectRead)
def update_project_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
    id: str,
    new_data: ProjectUpdate,
):
    return update_project(db, current_user, id, new_data)


@router.put("/@me/refresh", response_model=list[ProjectRead])
def update_project_refresh_current_user(
    db: Annotated[Database, Depends(get_db)],
    current_user: Annotated[str, Depends(get_current_user)],
    current_account: Annotated[Account, Depends(get_current_account)],
):
    return update_project_refresh(db, current_user, current_account.nickname)
