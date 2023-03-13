from pydantic import BaseModel


class SkillBase(BaseModel):
    name: str


class SkillCreate(SkillBase):
    ...


class SkillRead(SkillBase):
    id: int


class SkillUpdate(BaseModel):
    name: str | None = None
