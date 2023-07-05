import { Controller, Get, Param } from '@nestjs/common';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Get('html/:user')
  async getHtml(@Param('user') user: string) {
    return this.resumeService.getHtml(user);
  }
}
