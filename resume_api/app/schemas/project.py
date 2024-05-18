from uuid import UUID, uuid4

from pydantic import BaseModel, Field, HttpUrl, field_serializer


class Lang(BaseModel):
    color: str | None = None
    name: str
    percentage: float | None = None


class ProjectBase(BaseModel):
    url: HttpUrl
    name: str
    description: str
    langs: list[Lang] = []
    public: bool = False


class ProjectDB(ProjectBase):
    id: UUID = Field(default_factory=uuid4, alias="_id")
    user_id: str

    @field_serializer("id")
    def serialize_id(self, id: UUID):
        return str(id)

    @field_serializer("url")
    def serialize_url(self, url: HttpUrl):
        return str(url)


class ProjectRead(ProjectBase):
    id: str = Field(alias="_id", serialization_alias="id")


class ProjectUpdate(BaseModel):
    public: bool | None = None
