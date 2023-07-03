import { SchemaFactory } from '@nestjs/mongoose';

export class About {}

export const AboutSchema = SchemaFactory.createForClass(About);
