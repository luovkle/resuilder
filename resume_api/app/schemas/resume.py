from uuid import UUID, uuid4

from pydantic import BaseModel, Field, field_serializer


class ResumeBase(BaseModel):
    public: bool = True


class ResumeDB(ResumeBase):
    id: UUID = Field(default_factory=uuid4, alias="_id")
    user_id: str
    nickname: str

    @field_serializer("id")
    def serialize_id(self, id: UUID):
        return str(id)


class ResumeRead(ResumeBase):
    id: str = Field(alias="_id", serialization_alias="id")
    nickname: str


class ResumeUpdate(BaseModel):
    public: bool | None = None
