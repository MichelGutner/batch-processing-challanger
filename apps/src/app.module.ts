import { Module } from '@nestjs/common';
import { IngestionModule } from './modules/ingestion/application/ingestion.module';
import { LoggerModule } from '@modules/logger';

@Module({
  imports: [IngestionModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
