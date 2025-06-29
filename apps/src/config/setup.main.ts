import { AppLoggerService } from '@modules/logger';
import { INestApplication, VersioningType } from '@nestjs/common';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export async function setupApplication(app: INestApplication): Promise<void> {
  const logger = app.get(AppLoggerService);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://guest:guest@127.0.0.1:5672'],
  //     queue: 'Csv_Process',
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();

  app.useLogger(logger);

  await app.listen(process.env.PORT ?? 3000);
}
