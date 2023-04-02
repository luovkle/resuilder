from pydantic import BaseModel, HttpUrl


class ProfileBase(BaseModel):
    name: str
    content: str
    url: HttpUrl


class ProfileRead(ProfileBase):
    ...


class ProfileUpdate(BaseModel):
    name: str | None = None
    content: str | None = None
