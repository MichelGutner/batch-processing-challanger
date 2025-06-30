import { BatcherService } from '../batcher.service';
import { Person } from '@common/src/domain';
import { ClientProxy } from '@nestjs/microservices';

describe('BatcherService', () => {
  let service: BatcherService;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(() => {
    clientProxyMock = {
      emit: jest.fn().mockReturnValue({
        toPromise: () => Promise.resolve(),
      }),
    } as unknown as jest.Mocked<ClientProxy>;

    service = new BatcherService(clientProxyMock);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should send data in two batches', async () => {
    const data: Person[] = Array.from({ length: 2000 }, (_, i) => ({
      id: `${i}`,
      name: `Person ${i}`,
      phone: `0000-000${i}`,
      state: 'MG',
    }));

    await service.execute(data, 1000);

    // Simula a execução dos timeouts
    jest.runAllTimers();

    expect(clientProxyMock.emit).toHaveBeenCalledTimes(2);
    expect(clientProxyMock.emit).toHaveBeenCalledWith(
      'Csv_Process',
      data.slice(0, 1000),
    );
    expect(clientProxyMock.emit).toHaveBeenCalledWith(
      'Csv_Process',
      data.slice(1000, 2000),
    );
  });

  it('should not call emit if data is empty', async () => {
    await service.execute([], 1000);

    jest.runAllTimers();

    expect(clientProxyMock.emit).not.toHaveBeenCalled();
  });
});
