import { Person } from '@modules/ingestion/src/domain';
import { Batcher } from './interfaces';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class BatcherService implements Batcher {
  constructor(
    @Inject('CSV_PROCESSOR')
    private readonly rabbitMq: ClientProxy,
  ) {}
  async execute(data: Person[], size: number): Promise<void> {
    let currentBatch = 1;
    const maxBatches = Math.ceil(data.length / size);

    while (currentBatch <= maxBatches) {
      const start = (currentBatch - 1) * size;
      const end = Math.ceil(currentBatch * size);
      const batch = data.slice(start, end);

      setTimeout(async () => {
        const result = await this.rabbitMq.emit(
          'Csv_Process',
          JSON.stringify(batch),
        );
        
      }, 1000 * currentBatch);

      currentBatch++;
    }
  }
}
