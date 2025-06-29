import { CsvReaderService } from '../csv-reader.service';
import * as csv from 'fast-csv';
import { Logger } from '@modules/logger/application';

const pipeMock = {
  toArray: jest.fn().mockResolvedValue(
    Array.from({ length: 2000 }, (_, i) => ({
      nome: `Pessoa ${i}`,
      idade: 20 + (i % 10),
      estado: 'MG',
      cpf: `000.000.000-${i}`,
    })),
  ),
};

jest.mock('fs', () => ({
  createReadStream: jest.fn(() => ({
    pipe: jest.fn().mockReturnValue(pipeMock),
  })),
}));
jest.mock('fast-csv');

describe('CsvReaderService', () => {
  let csvReader: CsvReaderService;
  let logger: jest.Mocked<Logger>;

  beforeEach(() => {
    logger = {
      info: jest.fn(),
    } as unknown as jest.Mocked<Logger>;

    csvReader = new CsvReaderService(logger);

    (csv.parse as jest.Mock).mockReturnValue(pipeMock);
  });

  it('should process the CSV and send two batches', async () => {
    const sendBatchSpy = jest
      .spyOn(csvReader as any, 'sendBatch')
      .mockResolvedValue(undefined);

    await csvReader.execute('fake/path/to/file.csv', ',');

    expect(sendBatchSpy).toHaveBeenCalledTimes(2);
    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining('Batch 1'),
      'CsvReaderService',
    );
    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining('Batch 2'),
      'CsvReaderService',
    );
  });
});
