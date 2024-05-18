from fastapi import HTTPException, status
from pymongo.database import Database

from app.crud.resume import check_resume_exists
from app.schemas.project import ProjectDB, ProjectUpdate
from app.scrapers.repositories import get_repository_list


def setup_projects(db: Database, user_id: str, nickname: str) -> dict:
    repositories = get_repository_list(nickname)
    projects: list[dict] = []
    for repository in repositories:
        project = ProjectDB(**{**repository.model_dump(), "user_id": user_id})
        projects.append(project.model_dump(by_alias=True))
    result = db.projects.insert_many(projects)
    inserted_count = len(result.inserted_ids)
    if inserted_count == 0:
        return {"msg": "No projects were saved"}
    return {"msg": f"Successfully saved {inserted_count} projects"}


def read_projects(db: Database, user_id: str) -> list:
    check_resume_exists(db, user_id)
    docs = list(db.projects.find({"user_id": user_id}))
    if not docs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No projects found for this user",
        )
    return docs


def update_project(
    db: Database, user_id: str, project_id: str, new_data: ProjectUpdate
) -> dict:
    check_resume_exists(db, user_id)
    update_data = new_data.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid data provided for update",
        )
    result = db.projects.update_one(
        {"_id": project_id, "user_id": user_id}, {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No changes made to the project",
        )
    updated_doc = db.projects.find_one({"_id": project_id, "user_id": user_id})
    if not updated_doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve updated project",
        )
    return updated_doc


def update_project_refresh(db: Database, user_id: str, nickname: str) -> list:
    check_resume_exists(db, user_id)
    repositories = get_repository_list(nickname)
    projects: list[dict] = []
    for repository in repositories:
        project = ProjectDB(**{**repository.model_dump(), "user_id": user_id})
        projects.append(project.model_dump(by_alias=True))
    db.projects.delete_many({"user_id": user_id})
    result = db.projects.insert_many(projects)
    inserted_count = len(result.inserted_ids)
    if inserted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No changes made to the projects",
        )
    docs = list(db.projects.find({"user_id": user_id}))
    if not docs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No projects found for this user",
        )
    return docs


def cleanup_projects(db: Database, user_id: str) -> dict:
    result = db.projects.delete_many({"user_id": user_id})
    if result.deleted_count == 0:
        return {"msg": "No projects found for the specified user"}
    return {"msg": f"All projects for user {user_id} deleted successfully"}
