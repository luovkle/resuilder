from uuid import uuid4

from pydantic import BaseModel, Field, HttpUrl


class ContactBase(BaseModel):
    title: str
    url: HttpUrl


class Contact(ContactBase):
    id: str = Field(default_factory=uuid4, alias="_id")
    user: str


class ContactCreate(ContactBase):
    ...


class ContactRead(ContactBase):
    id: str = Field(alias="_id")


class ContactUpdate(BaseModel):
    title: str | None = None
    url: HttpUrl | None = None
