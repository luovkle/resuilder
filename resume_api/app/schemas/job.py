from uuid import uuid4

from pydantic import BaseModel, Field, HttpUrl


class JobBase(BaseModel):
    title: str
    start_date: str
    end_date: str = "Present"
    details: str
    responsibilities: list[str] = []
    tech_stack: list[str] = []
    tools: list[str] = []


class JobDB(JobBase):
    id: str = Field(default_factory=uuid4, alias="_id")
    user_id: str
    picture_url: HttpUrl | None = None


class JobCreate(JobBase): ...  # noqa: E701


class JobRead(JobBase):
    id: str
    picture_url: HttpUrl | None = None


class JobUpdate(BaseModel):
    title: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    details: str | None = None
    responsibilities: list[str] | None = None
    tech_stack: list[str] | None = None
    tools: list[str] | None = None
