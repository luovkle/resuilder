from pydantic import BaseModel, HttpUrl


class About(BaseModel):
    about: str | None = None
    user: str


class Contact(BaseModel):
    title: str
    url: HttpUrl
    user: str


class Position(BaseModel):
    title: str
    company: str
    start_date: str
    end_date: str
    details: str
    picture_id: str
    picture_url: HttpUrl | None = None
    user: str


class Profile(BaseModel):
    name: str
    content: str | None = None
    picture_url: HttpUrl
    picture_id: str
    user: str


class Repository(BaseModel):
    name: str
    url: HttpUrl
    description: str
    lang: str
    stars: int
    forks: int
    show: bool
    user: str


class Skill(BaseModel):
    name: str
    user: str
