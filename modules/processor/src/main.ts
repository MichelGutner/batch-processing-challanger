import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProcessorModule } from './application';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProcessorModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI ?? 'amqp://localhost:5672'],
        queue: 'csv_process',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
}
void bootstrap();
