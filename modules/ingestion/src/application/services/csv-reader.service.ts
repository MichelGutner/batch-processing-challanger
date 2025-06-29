import { Inject, Injectable } from '@nestjs/common';
import { CsvReader } from './interfaces';
import { Logger } from '@modules/logger/application';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import { Person } from '@modules/ingestion/src/domain';

@Injectable()
export class CsvReaderService implements CsvReader {
  constructor(
    @Inject('Logger')
    private readonly logger: Logger,
  ) {}

  async execute(filePath: string, delimiter: string) {
    const stream = fs.createReadStream(filePath);
    const pipe = stream.pipe(
      csv.parse({ headers: true, delimiter: delimiter }),
    );

    const data: Person[] = await pipe.toArray();
    return data;
  }
}
