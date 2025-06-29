import { Person } from '@modules/ingestion/domain';
import { Batcher } from './interfaces';
import { Inject } from '@nestjs/common';
import amqp from 'amqp-connection-manager';
import { RabbitMQService } from '@modules/rabbitMQ';

export class BatcherService implements Batcher {
  constructor(
    @Inject('RabbitMQ')
    private readonly rabbitMq: RabbitMQService,
  ) {}
  async execute(data: Person[], size: number): Promise<void> {
    let currentBatch = 1;
    const maxBatches = Math.ceil(data.length / size);

    while (currentBatch <= maxBatches) {
      const start = (currentBatch - 1) * size;
      const end = Math.ceil(currentBatch * size);
      const batch = data.slice(start, end);

      this.rabbitMq.publish(batch);

      currentBatch++;
    }
  }
}
