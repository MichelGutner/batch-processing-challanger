import { Inject, Injectable } from '@nestjs/common';
import { CsvReader } from './interfaces';
import { Logger } from '@modules/logger/application';
import * as fs from 'fs';
import * as csv from 'fast-csv';

@Injectable()
export class CsvReaderService implements CsvReader {
  constructor(
    @Inject('Logger')
    private readonly logger: Logger,
  ) {}

  async execute(filePath: string): Promise<void> {
    const batchSize = 1000; // Define the batch size
    const stream = fs.createReadStream(filePath);
    console.log("🚀 ~ CsvReaderService ~ execute ~ stream:", stream)
    const pipe = stream.pipe(csv.parse({ headers: true, delimiter: ',' }));
    const list = await pipe.toArray();

    let currentBatch = 1;
    const maxBatches = Math.ceil(list.length / batchSize);

    while (list.length > currentBatch) {
      const batch = list.slice(
        (currentBatch - 1) * batchSize,
        currentBatch * batchSize,
      );

      if (batch.length > 0) {
        await this.sendBatch(batch);
        this.logger.info(
          `Batch ${currentBatch} of ${maxBatches} sent successfully.`,
          'CsvReaderService',
        );
      }

      currentBatch++;
    }

    return Promise.resolve();
  }

  private async sendBatch(batch: any[]): Promise<void> {
    console.log(`Sending batch of size: ${batch.length}`);
    return Promise.resolve();
  }
}
