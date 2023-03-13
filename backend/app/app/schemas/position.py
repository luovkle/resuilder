from pydantic import BaseModel, HttpUrl


class PositionBase(BaseModel):
    picture: HttpUrl
    title: str
    company: str
    start_date: str
    end_date: str
    details: str


class PositionCreate(PositionBase):
    ...


class PositionRead(PositionBase):
    id: str


class PositionUpdate(BaseModel):
    picture: HttpUrl | None = None
    title: str | None = None
    company: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    details: str | None = None
