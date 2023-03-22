from fastapi import APIRouter, Path, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload
from app.schemas.repository import RepositoryRead

router = APIRouter(prefix="/profiles", tags=["repositories"])


@router.get("/@me/repositories", response_model=list[RepositoryRead])
def read_current_repositories(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/repositories/{id}", response_model=RepositoryRead)
def read_current_repository(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Repository ID")
):
    ...


@router.put("/@me/repositories/{id}", response_model=RepositoryRead)
def update_current_repository(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Repository ID")
):
    ...
