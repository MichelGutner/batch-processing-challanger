import { Module } from '@nestjs/common';
import { ConsumerController } from './controllers/consumer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { ConsumerService } from './services/consumer.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'CSV_PROCESSOR',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672'],
          queue: 'rabbitmq_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ConsumerController],
  providers: [ConsumerService],
  exports: [],
})
export class ProcessorModule {}
