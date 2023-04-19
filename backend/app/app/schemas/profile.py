from uuid import uuid4

from pydantic import BaseModel, HttpUrl, Field


class ProfileBase(BaseModel):
    name: str
    content: str
    picture_url: HttpUrl


class Profile(ProfileBase):
    id: str = Field(default_factory=uuid4, alias="_id")
    picture_id: HttpUrl = Field(default_factory=uuid4)


class ProfileRead(ProfileBase):
    ...


class ProfileUpdate(BaseModel):
    name: str | None = None
    content: str | None = None
