from fastapi import APIRouter, Path

router = APIRouter(prefix="/profiles", tags=["positions"])


@router.post("/@me/positions")
def create_position():
    ...


@router.get("/@me/positions")
def read_current_positions():
    ...


@router.get("/@me/positions/{id}")
def read_current_position(id: int = Path(..., title="Position ID")):
    ...


@router.put("/@me/positions/{id}")
def update_current_position(id: int = Path(..., title="Position ID")):
    ...


@router.delete("/@me/positions/{id}")
def delete_current_position(id: int = Path(..., title="Position ID")):
    ...
