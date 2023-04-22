from uuid import uuid4

from pydantic import BaseModel, Field


class AboutBase(BaseModel):
    about: str | None = None


class About(AboutBase):
    id: str = Field(default_factory=uuid4, alias="_id")
    user: str


class AboutRead(AboutBase):
    ...


class AboutUpdate(BaseModel):
    about: str | None = None
