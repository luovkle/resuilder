from uuid import UUID, uuid4

from pydantic import BaseModel, Field, field_serializer


class ProfileBase(BaseModel):
    name: str
    about: str | None = None


class ProfileDB(ProfileBase):
    id: UUID = Field(default_factory=uuid4, alias="_id")
    user_id: str

    @field_serializer("id")
    def serialize_id(self, id: UUID):
        return str(id)


class ProfileRead(ProfileBase):
    id: str = Field(alias="_id", serialization_alias="id")


class ProfileUpdate(BaseModel):
    name: str | None = None
    about: str | None = None
