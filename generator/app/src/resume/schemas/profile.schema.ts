import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Profile {
  @Prop()
  name: string;

  @Prop()
  picture_url: string;

  @Prop()
  content: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
