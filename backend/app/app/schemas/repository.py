from pydantic import BaseModel, HttpUrl


class RepositoryBase(BaseModel):
    name: str
    url: HttpUrl
    description: str
    lang: str
    stars: int
    forks: str


class RepositoryCreate(RepositoryBase):
    ...


class RepositoryRead(RepositoryBase):
    id: str


class RepositoryUpdate(BaseModel):
    name: str | None = None
    url: HttpUrl | None = None
    description: str | None = None
    lang: str | None = None
    stars: int | None = None
    forks: str | None = None
