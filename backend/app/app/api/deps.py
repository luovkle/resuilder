import os

import requests
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials

from app.utils.jwt import VerifyToken

token_auth_scheme = HTTPBearer()


def get_user_info(token: HTTPAuthorizationCredentials):
    ISSUER = os.getenv("ISSUER", "")
    url = ISSUER + "userinfo"
    response = requests.get(
        url, headers={"Authorization": f"Bearer {token.credentials}"}
    )
    return response


def verify_token(token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    if result.get("status"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=result.get("msg", "")
        )
    return result
