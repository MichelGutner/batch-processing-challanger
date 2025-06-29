import { CsvReader } from 'src/application/services/interfaces';
import { IngestionController } from '../ingestion.controller';

describe('IngestionController', () => {
  let controller: IngestionController;
  let csvService: jest.Mocked<CsvReader>;

  beforeEach(() => {
    csvService = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<CsvReader>;

    controller = new IngestionController(csvService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process CSV', async () => {
    const result = await controller.processCsv();
    expect(result).toEqual({ message: 'CSV processado com sucesso' });
  });
});
