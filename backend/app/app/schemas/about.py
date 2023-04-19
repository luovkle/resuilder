from pydantic import BaseModel


class AboutBase(BaseModel):
    about: str


class About(AboutBase):
    user: str


class AboutRead(AboutBase):
    ...


class AboutUpdate(BaseModel):
    about: str | None = None
