from pydantic import BaseModel


class Account(BaseModel):
    sub: str
    nickname: str
    name: str
    picture: str
