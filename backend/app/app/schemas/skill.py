from uuid import uuid4

from pydantic import BaseModel, Field


class SkillBase(BaseModel):
    name: str


class Skill(SkillBase):
    id: str = Field(default_factory=uuid4, alias="_id")
    user: str


class SkillCreate(SkillBase):
    ...


class SkillRead(SkillBase):
    id: str = Field(alias="_id")


class SkillUpdate(BaseModel):
    name: str | None = None
