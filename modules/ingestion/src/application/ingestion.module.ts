import { Module } from '@nestjs/common';
import { CsvReaderService } from './services/csv-reader.service';
import { IngestionController } from './controllers/ingestion.controller';
import { BatcherService } from './services/batcher.service';
import { ProcessIngestionUseCase } from './usecases';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CSV_PROCESSOR',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI ?? 'amqp://guest:guest@localhost:5672'],
          queue: 'csv_process',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [IngestionController],
  providers: [
    ProcessIngestionUseCase,
    {
      provide: 'CsvReader',
      useClass: CsvReaderService,
    },
    {
      provide: 'Batcher',
      useClass: BatcherService,
    },
    {
      provide: 'ProcessIngestionUseCase',
      useClass: ProcessIngestionUseCase,
    },
  ],
})
export class IngestionModule {}
