import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configure as nunjucksConfigure } from 'nunjucks';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  nunjucksConfigure('src/resume/static', { autoescape: true });
  await app.listen(8001);
}
bootstrap();
