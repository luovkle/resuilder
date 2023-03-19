from pydantic import BaseModel


class SkillsBase(BaseModel):
    name: str


class SkillsCreate(SkillsBase):
    ...


class SkillsRead(SkillsBase):
    id: int


class SkillsUpdate(BaseModel):
    name: str | None = None
