import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Position {
  @Prop()
  title: string;

  @Prop()
  picture_url: string;

  @Prop()
  company: string;

  @Prop()
  start_date: string;

  @Prop()
  end_date: string;

  @Prop()
  details: string;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
