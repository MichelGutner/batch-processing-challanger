import { Injectable } from '@nestjs/common';
import { CsvReader } from './interfaces';

@Injectable()
export class CsvReaderService implements CsvReader {
  constructor() {}

  async execute(filePath: string): Promise<void> {
    console.log(`Processing CSV file at: ${filePath}`);
    return Promise.resolve();
  }

  private async sendBatch(batch: any[]): Promise<void> {
    // Simulate sending a batch of data
    console.log(`Sending batch of size: ${batch.length}`);
    // Here you would implement the logic to send the batch to your processing system
    return Promise.resolve();
  }
}
