import { MongooseStateRepository } from '@modules/states/infrastructure/mongoose/states.repository.impl';
import { StateServiceImpl } from '../state.service';
import { Person } from '@common/src/domain';

describe('StateServiceImpl', () => {
  let service: StateServiceImpl;
  let stateRepository: jest.Mocked<MongooseStateRepository>;

  beforeEach(() => {
    stateRepository = {
      findByStateName: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<MongooseStateRepository>;

    service = new StateServiceImpl(stateRepository);
  });

  it('should throw an error if input is not an array or empty', async () => {
    await expect(service.execute([])).rejects.toThrowError(
      /Invalid input/,
    );
  });

  it('should update state if it already exists', async () => {
    const mockPerson: Person = {
      id: '1',
      name: 'Alice',
      phone: '123456789',
      state: 'MG',
    };

    const existingState = {
      stateName: 'MG',
      numberOfPersons: 3,
    };

    stateRepository.findByStateName.mockResolvedValue(existingState);
    stateRepository.update.mockResolvedValue(undefined);

    const result = await service.execute([mockPerson]);

    expect(stateRepository.findByStateName).toHaveBeenCalledWith('SP');
    expect(stateRepository.update).toHaveBeenCalledWith({
      ...existingState,
      numberOfPersons: 4,
    });
    expect(result).toEqual({
      message: 'State processed successfully 1',
      status: 'success',
    });
  });

  it('should create a new state if it does not exist', async () => {
    const mockPerson: Person = {
      id: '2',
      name: 'Bob',
      phone: '987654321',
      state: 'MG',
    };

    stateRepository.findByStateName.mockResolvedValue(null);
    stateRepository.create.mockResolvedValue(undefined);

    const result = await service.execute([mockPerson]);

    expect(stateRepository.findByStateName).toHaveBeenCalledWith('MG');
    expect(stateRepository.create).toHaveBeenCalledWith({
      stateName: 'MG',
      numberOfPersons: 1,
    });
    expect(result).toEqual({
      message: 'State processed successfully 1',
      status: 'success',
    });
  });

  it('should throw an error if processPerson fails', async () => {
    const mockPerson: Person = {
      id: '3',
      name: 'Error Test',
      phone: '000000000',
      state: 'RJ',
    };

    stateRepository.findByStateName.mockRejectedValue(
      new Error('DB failure'),
    );

    await expect(service.execute([mockPerson])).rejects.toThrowError(
      /Error processing person Error Test/,
    );
  });
});
