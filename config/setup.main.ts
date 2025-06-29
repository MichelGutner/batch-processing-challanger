import { AppLoggerService } from '@modules/logger';
import { ProcessorModule } from '@modules/processor/src/application';
import { INestApplication, VersioningType } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export async function setupApplication(app: INestApplication): Promise<void> {
  const logger = app.get(AppLoggerService);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // await app.startAllMicroservices();

  app.useLogger(logger);

  await app.listen(process.env.PORT ?? 3000);
}
