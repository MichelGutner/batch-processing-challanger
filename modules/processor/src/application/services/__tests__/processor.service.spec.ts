import { ProcessorService } from '../processor.service';
import { Logger } from '@modules/logger/application';
import { StateService } from '@modules/states/application/services/interfaces';
import { Person } from '@common/src/domain';

describe('ProcessorService', () => {
  let processorService: ProcessorService;
  let stateService: jest.Mocked<StateService>;
  let logger: jest.Mocked<Logger>;

  beforeEach(() => {
    stateService = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<StateService>;

    logger = {
      info: jest.fn(),
    } as unknown as jest.Mocked<Logger>;

    processorService = new ProcessorService(stateService, logger);
  });

  it('should process data and call stateService with correct data', async () => {
    const mockData: Person[] = [
      { id: '1', name: 'Alice', phone: '123456789', state: 'MG' },
      { id: '2', name: 'Bob', phone: '987654321', state: 'SP' },
    ];

    await processorService.execute(mockData);

    expect(logger.info).toHaveBeenCalledWith(
      `Processing ${mockData.length} records`,
    );
    expect(stateService.execute).toHaveBeenCalledWith(mockData);
  });
});
