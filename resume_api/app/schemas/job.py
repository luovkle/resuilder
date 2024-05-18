from uuid import UUID, uuid4

from pydantic import BaseModel, Field, HttpUrl, field_serializer


class JobBase(BaseModel):
    title: str
    start_date: str
    end_date: str = "Present"
    details: str
    responsibilities: list[str] = []
    tech_stack: list[str] = []
    tools: list[str] = []


class JobDB(JobBase):
    id: UUID = Field(default_factory=uuid4, alias="_id")
    user_id: str
    picture_url: HttpUrl | None = None
    picture_id: UUID = Field(default_factory=uuid4)

    @field_serializer("id")
    def serialize_id(self, id: UUID):
        return str(id)

    @field_serializer("picture_url")
    def serialize_picture_url(self, picture_url: HttpUrl | None):
        return str(picture_url) if picture_url else picture_url

    @field_serializer("picture_id")
    def serialize_picture_id(self, picture_id: UUID):
        return str(picture_id)


class JobCreate(JobBase): ...  # noqa: E701


class JobRead(JobBase):
    id: str = Field(alias="_id", serialization_alias="id")
    picture_url: HttpUrl | None = None


class JobUpdate(BaseModel):
    title: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    details: str | None = None
    responsibilities: list[str] | None = None
    tech_stack: list[str] | None = None
    tools: list[str] | None = None
