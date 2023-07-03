import { SchemaFactory } from '@nestjs/mongoose';

export class Position {}

export const PositionSchema = SchemaFactory.createForClass(Position);
