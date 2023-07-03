import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { About } from './schemas/about.schema';
import { Model } from 'mongoose';
import { Contact } from './schemas/contact.schema';
import { Position } from './schemas/position.schema';
import { Profile } from './schemas/profile.schema';
import { Repository } from './schemas/repository.schema';
import { Skill } from './schemas/skill.schema';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(About.name) private aboutModel: Model<About>,
    @InjectModel(Contact.name) private contactModel: Model<About>,
    @InjectModel(Position.name) private positionModel: Model<About>,
    @InjectModel(Profile.name) private profileModel: Model<About>,
    @InjectModel(Repository.name) private repositoryModel: Model<About>,
    @InjectModel(Skill.name) private skillModel: Model<About>,
  ) {}

  async #getData(user: string) {
    const data = {
      about: await this.aboutModel.findOne({ user }),
      contacts: await this.contactModel.find({ user }),
      positions: await this.positionModel.find({ user }),
      profile: await this.profileModel.findOne({ user }),
      repositories: await this.repositoryModel.find({ user, show: true }),
      skills: await this.skillModel.find({ user }),
    };
    return data;
  }
}
