from uuid import uuid4

from pydantic import BaseModel, Field, HttpUrl


class Lang(BaseModel):
    name: str
    percentage: float


class ProjectBase(BaseModel):
    url: HttpUrl
    name: str
    description: str
    langs: list[Lang] = []
    public: bool = False


class ProjectDB(ProjectBase):
    id: str = Field(default_factory=uuid4, alias="_id")
    user_id: str


class ProjectRead(ProjectBase):
    id: str


class ProjectUpdate(BaseModel):
    public: bool | None = None
