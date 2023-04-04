from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.api.deps import verify_token, get_db
from app.schemas.payload import Payload
from app.schemas.about import AboutRead, AboutUpdate
from app.crud.about import crud_about

router = APIRouter(prefix="/profiles", tags=["about"])


@router.get("/@me/about", response_model=AboutRead)
def read_current_about(
    token: Payload = Depends(verify_token), db: Database = Depends(get_db)
):
    return crud_about.read(db, token["sub"])


@router.put("/@me/about", response_model=AboutRead)
def update_current_about(
    token: Payload = Depends(verify_token),
    db: Database = Depends(get_db),
    *,
    about: AboutUpdate
):
    return crud_about.update(db, token["sub"], about)
