import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Skill {
  @Prop()
  name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
