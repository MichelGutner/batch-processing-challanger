import { Module } from '@nestjs/common';
import { LoggerModule } from '@modules/logger';
import { IngestionModule } from '.';
// console.log('🚀 ~ process.env.RABBITMQ_URI :', process.env.RABBITMQ_URI);

@Module({
  imports: [IngestionModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
