from uuid import uuid4

from pydantic import BaseModel, Field, HttpUrl


class PositionBase(BaseModel):
    picture_url: HttpUrl
    title: str
    company: str
    start_date: str
    end_date: str
    details: str


class Position(PositionBase):
    id: str = Field(default_factory=uuid4, alias="_id")


class PositionCreate(PositionBase):
    ...


class PositionRead(PositionBase):
    id: str = Field(alias="_id")


class PositionUpdate(BaseModel):
    picture_url: HttpUrl | None = None
    title: str | None = None
    company: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    details: str | None = None
