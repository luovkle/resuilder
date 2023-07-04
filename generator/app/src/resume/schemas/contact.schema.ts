import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Contact {
  @Prop()
  url: string;

  @Prop()
  title: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
