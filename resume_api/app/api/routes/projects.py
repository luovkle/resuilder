from fastapi import APIRouter

from app.schemas.project import ProjectRead, ProjectUpdate

router = APIRouter()


@router.get("/@me", response_model=list[ProjectRead])
def read_projects_current_user(): ...


@router.patch("/@me", response_model=ProjectRead)
def update_project_current_user(new_data: ProjectUpdate): ...


@router.put("/@me/refresh", response_model=list[ProjectRead])
def update_project_refresh_current_user(): ...
