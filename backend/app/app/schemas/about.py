from pydantic import BaseModel


class AboutBase(BaseModel):
    about: str


class AboutCreate(AboutBase):
    ...


class AboutRead(AboutBase):
    ...


class AboutUpdate(BaseModel):
    about: str | None = None
