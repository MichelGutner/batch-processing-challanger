import { Module } from '@nestjs/common';
import { ConsumerController } from './controllers/consumer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { ConsumerService } from './services/consumer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StateServiceImpl } from '@modules/states/application/services/state.service';
import { StateModule } from '@modules/states/application/state.module';

@Module({
  imports: [
    HttpModule,
    StateModule,
    MongooseModule.forRoot('mongodb://localhost:27017/batch-processing'),
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
  providers: [
    ConsumerService,
    StateServiceImpl,
    {
      provide: 'StatesService',
      useClass: StateServiceImpl,
    },
    {
      provide: 'Consumer',
      useClass: ConsumerService,
    },
  ],
  exports: [],
})
export class ProcessorModule {}
