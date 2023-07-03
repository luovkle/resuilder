import { SchemaFactory } from '@nestjs/mongoose';

export class Profile {}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
