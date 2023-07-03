import { SchemaFactory } from '@nestjs/mongoose';

export class Skill {}

export const SkillSchema = SchemaFactory.createForClass(Skill);
