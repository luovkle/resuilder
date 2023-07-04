import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Repository {
  @Prop()
  url: string;

  @Prop()
  name: string;

  @Prop()
  desscription: string;

  @Prop()
  lang: string;

  @Prop()
  stars: string;

  @Prop()
  forks: string;
}

export const RepositorySchema = SchemaFactory.createForClass(Repository);
