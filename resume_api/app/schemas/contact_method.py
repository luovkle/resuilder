from uuid import uuid4

from pydantic import BaseModel, Field, HttpUrl


class ContactMethodBase(BaseModel):
    title: str
    url: HttpUrl


class ContactMethodDB(ContactMethodBase):
    id: str = Field(default_factory=uuid4, alias="_id")
    user_id: str


class ContactMethodCreate(ContactMethodBase): ...  # noqa: E701


class ContactMethodRead(ContactMethodBase):
    id: str


class ContactMethodUpdate(BaseModel):
    title: str | None = None
    url: HttpUrl | None = None
