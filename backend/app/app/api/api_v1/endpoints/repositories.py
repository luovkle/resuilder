from fastapi import APIRouter, Path

router = APIRouter(prefix="/profiles", tags=["repositories"])


@router.post("/@me/repositories")
def create_repository():
    ...


@router.get("/@me/repositories")
def read_current_repositories():
    ...


@router.get("/@me/repositories/{id}")
def read_current_repository(id: int = Path(..., title="Repository ID")):
    ...


@router.put("/@me/repositories/{id}")
def update_current_repository(id: int = Path(..., title="Repository ID")):
    ...


@router.delete("/@me/repositories/{id}")
def delete_current_repository(id: int = Path(..., title="Repository ID")):
    ...
