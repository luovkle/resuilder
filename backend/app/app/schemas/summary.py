from pydantic import BaseModel, HttpUrl


class SummaryBase(BaseModel):
    name: str
    content: str
    url: HttpUrl


class SummaryCreate(SummaryBase):
    ...


class SummaryRead(SummaryBase):
    id: int


class SummaryUpdate(BaseModel):
    name: str | None = None
    content: str | None = None
    url: HttpUrl | None = None
