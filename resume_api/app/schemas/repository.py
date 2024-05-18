from pydantic import BaseModel, HttpUrl, field_serializer


class Lang(BaseModel):
    color: str | None = None
    name: str
    percentage: float | None = None


class Repository(BaseModel):
    name: str
    url: HttpUrl
    description: str
    langs: list[Lang] = []

    @field_serializer("url")
    def serialize_url(self, url: HttpUrl):
        return str(url)
