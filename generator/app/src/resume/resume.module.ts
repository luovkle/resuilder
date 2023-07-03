import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutSchema } from './schemas/about.schema';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { Position, PositionSchema } from './schemas/position.schema';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { Repository, RepositorySchema } from './schemas/repository.schema';
import { Skill, SkillSchema } from './schemas/skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: About.name,
        schema: AboutSchema,
      },
      {
        name: Contact.name,
        schema: ContactSchema,
      },
      {
        name: Position.name,
        schema: PositionSchema,
      },
      {
        name: Profile.name,
        schema: ProfileSchema,
      },
      {
        name: Repository.name,
        schema: RepositorySchema,
      },
      {
        name: Skill.name,
        schema: SkillSchema,
      },
    ]),
  ],
  providers: [ResumeService],
  controllers: [ResumeController]
})
export class ResumeModule {}
