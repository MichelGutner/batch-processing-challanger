import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngestionModule } from './application/ingestion.module';

@Module({
  imports: [IngestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
