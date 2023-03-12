from fastapi import APIRouter, Path, Depends

from app.api.deps import verify_token
from app.schemas.payload import Payload

router = APIRouter(prefix="/profiles", tags=["repositories"])


@router.post("/@me/repositories")
def create_repository(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/repositories")
def read_current_repositories(token: Payload = Depends(verify_token)):
    ...


@router.get("/@me/repositories/{id}")
def read_current_repository(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Repository ID")
):
    ...


@router.put("/@me/repositories/{id}")
def update_current_repository(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Repository ID")
):
    ...


@router.delete("/@me/repositories/{id}")
def delete_current_repository(
    token: Payload = Depends(verify_token), id: int = Path(..., title="Repository ID")
):
    ...
