import { ProcessIngestion } from '../../usecases/interfaces';
import { IngestionController } from '../ingestion.controller';

describe('IngestionController', () => {
  let controller: IngestionController;
  let useCase: jest.Mocked<ProcessIngestion>;

  beforeEach(() => {
    useCase = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<ProcessIngestion>;

    controller = new IngestionController(useCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process CSV', async () => {
    const result = await controller.processCsv(
      {
        path: 'test.csv',
        originalname: 'test.csv',
      } as any,
      {
        batchSize: 100,
        delimiter: ',',
      },
    );
    expect(result).toEqual({ message: 'CSV processado com sucesso' });
  });
});
