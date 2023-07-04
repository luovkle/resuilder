import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class About {
  @Prop()
  about: string;
}

export const AboutSchema = SchemaFactory.createForClass(About);
