from pydantic import BaseModel, HttpUrl


class ContactBase(BaseModel):
    title: str
    url: HttpUrl


class ContactCreate(ContactBase):
    ...


class ContactRead(ContactBase):
    id: str


class ContactUpdate(BaseModel):
    title: str | None = None
    url: HttpUrl | None = None
