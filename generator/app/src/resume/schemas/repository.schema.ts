import { SchemaFactory } from '@nestjs/mongoose';

export class Repository {}

export const RepositorySchema = SchemaFactory.createForClass(Repository);
