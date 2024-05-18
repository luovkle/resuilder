import httpx
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials

from app.core.config import settings
from app.core.db import client
from app.core.security import VerifyToken
from app.schemas.account import Account

token_auth_scheme = HTTPBearer()


def get_db():
    return client[settings.DB_NAME]


def get_current_user(
    token: HTTPAuthorizationCredentials = Depends(token_auth_scheme),
) -> str:
    result = VerifyToken(token.credentials).verify()
    if result.get("status"):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail=result.get("msg", ""))
    if not result.get("sub"):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    return result["sub"]


def get_current_account(request: Request) -> Account:
    access_token = request.headers["Authorization"].split()[1]
    response = httpx.get(
        settings.AUTH0_ISSUER + "userinfo",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    try:
        response.raise_for_status()
        account = Account(**response.json())
    except:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
    return account
