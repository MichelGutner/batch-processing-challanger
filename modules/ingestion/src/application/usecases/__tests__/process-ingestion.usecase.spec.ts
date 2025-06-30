import { ProcessIngestionUseCase } from '../process-ingestion.usecase';
import { CsvReader, Batcher } from '../../services/interfaces';
import { Logger } from '@modules/logger/application';
import { ProcessInputDto } from '../../dtos/process.dto';
import { Person } from '@common/src/domain';

describe('ProcessIngestionUseCase', () => {
  let useCase: ProcessIngestionUseCase;
  let csvReaderMock: jest.Mocked<CsvReader>;
  let batcherMock: jest.Mocked<Batcher>;
  let loggerMock: jest.Mocked<Logger>;

  beforeEach(() => {
    csvReaderMock = {
      execute: jest.fn(),
    };

    batcherMock = {
      execute: jest.fn(),
    };

    loggerMock = {
      info: jest.fn(),
    } as unknown as jest.Mocked<Logger>;

    useCase = new ProcessIngestionUseCase(
      csvReaderMock,
      batcherMock,
      loggerMock,
    );
  });

  it('should read CSV and pass data to batcher', async () => {
    const mockData: Person[] = [
      { id: '1', name: 'John Doe', phone: '123456789', state: 'SP' },
    ];
    const dto: ProcessInputDto = {
      delimiter: ',',
      batchSize: 1000,
    };

    csvReaderMock.execute.mockResolvedValue(mockData);
    batcherMock.execute.mockResolvedValue();

    await useCase.execute('fake/path/to/file.csv', dto);

    expect(csvReaderMock.execute).toHaveBeenCalledWith(
      'fake/path/to/file.csv',
      ',',
    );
    expect(batcherMock.execute).toHaveBeenCalledWith(mockData, 1000);
  });

  it('should handle empty data gracefully', async () => {
    const dto: ProcessInputDto = {
      delimiter: ';',
      batchSize: 500,
    };

    csvReaderMock.execute.mockResolvedValue([]);
    batcherMock.execute.mockResolvedValue();

    await useCase.execute('another/path.csv', dto);

    expect(csvReaderMock.execute).toHaveBeenCalledWith('another/path.csv', ';');
    expect(batcherMock.execute).toHaveBeenCalledWith([], 500);
  });
});
