from uuid import UUID, uuid4

from pydantic import BaseModel, Field, HttpUrl, field_serializer


class ContactMethodBase(BaseModel):
    title: str
    url: HttpUrl


class ContactMethodDB(ContactMethodBase):
    id: UUID = Field(default_factory=uuid4, alias="_id")
    user_id: str

    @field_serializer("id")
    def serialize_id(self, id: UUID):
        return str(id)

    @field_serializer("url")
    def serialize_url(self, url: HttpUrl):
        return str(url)


class ContactMethodCreate(ContactMethodBase): ...  # noqa: E701


class ContactMethodRead(ContactMethodBase):
    id: str = Field(alias="_id", serialization_alias="id")


class ContactMethodUpdate(BaseModel):
    title: str | None = None
    url: HttpUrl | None = None

    @field_serializer("url")
    def serialize_url(self, url: HttpUrl):
        return str(url)
