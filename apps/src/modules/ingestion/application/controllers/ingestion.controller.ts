import { Controller, Inject, Post, Version } from '@nestjs/common';
import { CsvReader } from '../services/interfaces';
import { Versioning } from '@shared/types/version';

@Controller('/ingestion')
export class IngestionController {
  constructor(
    @Inject('CsvReader')
    private readonly csvReader: CsvReader,
  ) {}

  @Version(Versioning.V1)
  @Post('process')
  async processCsv() {
    await this.csvReader.execute('../../../../support/ingestion.csv');
    return { message: 'CSV processado com sucesso' };
  }
}
