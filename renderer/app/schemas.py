from pydantic import BaseModel, HttpUrl


class Resume(BaseModel):
    public: bool
    user_id: str
    nickname: str


class Profile(BaseModel):
    name: str
    about: str | None = None


class ContactMethod(BaseModel):
    title: str
    url: HttpUrl


class Job(BaseModel):
    picture_url: HttpUrl | None = None
    title: str
    start_date: str
    end_date: str
    details: str
    responsibilities: list[str] = []
    tech_stack: list[str] = []
    tools: list[str] = []


class Lang(BaseModel):
    color: str | None = None
    name: str
    percentage: float | None = None


class Project(BaseModel):
    url: HttpUrl
    name: str
    description: str
    langs: list[Lang] = []
    public: bool
