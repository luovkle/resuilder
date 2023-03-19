from pydantic import BaseModel


class SkillsBase(BaseModel):
    skills: list[str]


class SkillsCreate(SkillsBase):
    ...


class SkillsRead(SkillsBase):
    ...


class SkillsUpdate(BaseModel):
    skills: list[str] = []
