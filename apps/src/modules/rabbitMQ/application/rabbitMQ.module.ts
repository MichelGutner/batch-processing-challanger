import { Global, Module } from '@nestjs/common';
import { RabbitMQService } from './services';

@Global()
@Module({
  imports: [],
  providers: [
    RabbitMQService,
    {
      provide: 'RabbitMQ',
      useExisting: RabbitMQService,
    },
  ],
  exports: [{ provide: 'RabbitMQ', useClass: RabbitMQService }],
})
export class RabbitMQModule {}
