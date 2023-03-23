from typing import TypedDict
from uuid import uuid4

from pydantic import BaseModel, Field, HttpUrl


class RepositoryBase(BaseModel):
    name: str
    url: HttpUrl
    description: str
    lang: str
    stars: int
    forks: int
    show: bool = False


class Repository(RepositoryBase):
    id: str = Field(default_factory=uuid4, alias="_id")


class RepositoryRead(RepositoryBase):
    id: str = Field(alias="_id")


class RepositoryUpdate(BaseModel):
    show: bool | None = None


class RepositoryRaw(TypedDict):
    name: str
    url: HttpUrl
    description: str
    lang: str
    stars: int
    forks: int
