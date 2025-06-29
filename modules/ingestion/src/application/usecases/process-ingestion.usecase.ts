import { Inject, Injectable } from '@nestjs/common';
import { ProcessIngestion } from './interfaces';
import { Batcher, CsvReader } from '../services/interfaces';
import { ProcessInputDto } from '../dtos/process.dto';
import { Logger } from '@modules/logger/application';

@Injectable()
export class ProcessIngestionUseCase implements ProcessIngestion {
  constructor(
    @Inject('CsvReader')
    private readonly csvReader: CsvReader,
    @Inject('Batcher')
    private readonly batcher: Batcher,
    @Inject('Logger')
    private readonly logger: Logger,
  ) {}

  async execute(filePath: string, query: ProcessInputDto): Promise<void> {
    const data = await this.csvReader.execute(filePath, query.delimiter);
    await this.batcher.execute(data, query.batchSize);
  }
}
