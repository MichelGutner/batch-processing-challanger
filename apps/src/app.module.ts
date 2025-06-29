import { Module } from '@nestjs/common';
import { IngestionModule } from './modules/ingestion/application/ingestion.module';

@Module({
  imports: [IngestionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
