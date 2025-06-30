import { Logger } from '@modules/logger/application';
import { ProcessorService } from '../../services/processor.service';
import { ProcessorController } from '../processor.controller';

describe('IngestionController', () => {
  let controller: ProcessorController;
  let service: jest.Mocked<ProcessorService>;
  let logger: jest.Mocked<Logger>;

  beforeEach(() => {
    service = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<ProcessorService>;

    logger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as jest.Mocked<Logger>;

    controller = new ProcessorController(service, logger);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process CSV', async () => {
    await controller.receiveFromQueue([
      { id: '1', name: 'John Doe', phone: '123456789', state: 'MG' },
    ]);
    expect(service.execute).toHaveBeenCalledWith([
      { id: '1', name: 'John Doe', phone: '123456789', state: 'MG' },
    ]);
  });
});
