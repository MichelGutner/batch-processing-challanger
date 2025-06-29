import { Module } from '@nestjs/common';
import { CsvReaderService } from './services/csv-reader.service';
import { IngestionController } from './controllers/ingestion.controller';
import { BatcherService } from './services/batcher.service';
import { ProcessIngestionUseCase } from './usecases';

@Module({
  imports: [],
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
