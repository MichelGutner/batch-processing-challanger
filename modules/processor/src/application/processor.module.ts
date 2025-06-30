import { Module } from '@nestjs/common';
import { ProcessorController } from './controllers/processor.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { ProcessorService } from './services/processor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StateServiceImpl } from '@modules/states/application/services/state.service';
import { StateModule } from '@modules/states/application/state.module';
import { LoggerModule } from '@modules/logger';

@Module({
  imports: [
    HttpModule,
    StateModule,
    LoggerModule,
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
  controllers: [ProcessorController],
  providers: [
    ProcessorService,
    StateServiceImpl,
    {
      provide: 'StatesService',
      useClass: StateServiceImpl,
    },
    {
      provide: 'Processor',
      useClass: ProcessorService,
    },
  ],
  exports: [],
})
export class ProcessorModule {}
