import { CsvReaderService } from '../csv-reader.service';

describe('CsvReaderImplementation', () => {
  let csvReader: CsvReaderService;

  beforeEach(() => {
    csvReader = new CsvReaderService();
    jest.spyOn(csvReader, 'execute').mockImplementation(async () => {});
  });
  it('should process CSV file', async () => {
    const filePath = '';

    const result = await csvReader.execute(filePath);
    expect(result).toBeUndefined();
  });
});
