import { Module } from '@nestjs/common';
import { CsvReaderService } from './services/csv-reader.service';
import { IngestionController } from './controllers/ingestion.controller';

@Module({
  imports: [],
  controllers: [IngestionController],
  providers: [
    {
      provide: 'CsvReader',
      useClass: CsvReaderService,
    },
  ],
})
export class IngestionModule {}
