from fastapi import APIRouter, Path, Depends

from app.api.deps import verify_token, get_access_token
from app.schemas.payload import Payload
from app.schemas.repository import RepositoryRead, RepositoryUpdate
from app.crud.repository import crud_repository

router = APIRouter(prefix="/profiles", tags=["repositories"])


@router.get("/@me/repositories", response_model=list[RepositoryRead])
def read_current_repositories(
    token: Payload = Depends(verify_token),
    access_token: str = Depends(get_access_token),
):
    return crud_repository.read_many(token["sub"], access_token)


@router.get("/@me/repositories/{id}", response_model=RepositoryRead)
def read_current_repository(
    token: Payload = Depends(verify_token), id: str = Path(..., title="Repository ID")
):
    return crud_repository.read_one(token["sub"], id)


@router.put("/@me/repositories/{id}", response_model=RepositoryRead)
def update_current_repository(
    token: Payload = Depends(verify_token),
    id: str = Path(..., title="Repository ID"),
    *,
    repository: RepositoryUpdate
):
    return crud_repository.update(token["sub"], id, repository)
