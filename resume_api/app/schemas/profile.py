from uuid import uuid4

from pydantic import BaseModel, Field


class ProfileBase(BaseModel):
    name: str
    about: str


class ProfileDB(ProfileBase):
    id: str = Field(default_factory=uuid4, alias="_id")
    user_id: str


class ProfileRead(ProfileBase):
    id: str


class ProfileUpdate(BaseModel):
    name: str | None = None
    about: str | None = None
