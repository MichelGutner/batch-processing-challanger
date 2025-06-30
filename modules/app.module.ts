import { Module } from '@nestjs/common';
import { LoggerModule } from '@modules/logger';
import { IngestionModule } from '.';
@Module({
  imports: [IngestionModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
