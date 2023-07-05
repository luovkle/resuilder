import { Controller, Get, Header, Param, StreamableFile } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { createReadStream } from 'fs';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Get('html/:user')
  async getHtml(@Param('user') user: string) {
    return this.resumeService.getHtml(user);
  }

  @Get('pdf/:user')
  @Header('Content-Type', 'application/pdf')
  async getPdf(@Param('user') user: string) {
    const pdfPath = await this.resumeService.getPdf(user);
    const file = createReadStream(pdfPath);
    return new StreamableFile(file);
  }
}
