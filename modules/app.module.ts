import { Module } from '@nestjs/common';
import { LoggerModule } from '@modules/logger';
import { IngestionModule } from '.';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    IngestionModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('AppModule initialized');
    console.log('ProcessorModule loaded', process.env.RABBITMQ_URI);
  }
}
