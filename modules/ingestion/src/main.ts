import { setupApplication } from '@config/setup.main';
import { AppModule } from '@modules/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupApplication(app);
}
void bootstrap();
