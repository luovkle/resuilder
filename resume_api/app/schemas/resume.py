from uuid import uuid4

from pydantic import BaseModel, Field


class ResumeBase(BaseModel):
    public: bool = False


class ResumeDB(ResumeBase):
    id: str = Field(default_factory=uuid4, alias="_id")
    user_id: str


class ResumeRead(ResumeBase):
    id: str


class ResumeUpdate(BaseModel):
    public: bool | None = None
