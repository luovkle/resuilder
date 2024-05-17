from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials

from app.core.config import settings
from app.core.db import client
from app.core.security import VerifyToken

token_auth_scheme = HTTPBearer()


def get_db():
    return client[settings.DB_NAME]


def get_current_user(token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    if result.get("status"):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail=result.get("msg", ""))
    if not result.get("sub"):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    return result["sub"]
