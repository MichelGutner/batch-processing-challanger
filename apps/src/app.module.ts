import { Module } from '@nestjs/common';
import { IngestionModule } from './modules/ingestion/application/ingestion.module';
import { LoggerModule } from '@modules/logger';
import { RabbitMQModule } from '@modules/rabbitMQ';

@Module({
  imports: [IngestionModule, LoggerModule, RabbitMQModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
