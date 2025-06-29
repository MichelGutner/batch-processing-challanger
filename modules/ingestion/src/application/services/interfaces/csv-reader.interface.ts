import { Person } from '@common/src/domain';

export interface CsvReader {
  execute(filePath: string, delimiter: string): Promise<Person[]>;
}
