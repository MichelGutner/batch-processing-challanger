import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApplication } from './config/setup.main';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupApplication(app);
}
void bootstrap();
