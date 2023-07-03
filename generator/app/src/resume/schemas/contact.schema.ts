import { SchemaFactory } from '@nestjs/mongoose';

export class Contact {}

export const ContactSchema = SchemaFactory.createForClass(Contact);
