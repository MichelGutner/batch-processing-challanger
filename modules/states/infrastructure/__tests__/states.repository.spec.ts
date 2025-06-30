import { MongooseStateRepository } from '../mongoose/states.repository.impl';

describe('MongooseStateRepository', () => {
  let repository: MongooseStateRepository;
  let model: any;

  beforeEach(() => {
    model = {
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      create: jest.fn(),
    };

    repository = new MongooseStateRepository(model);
  });

  describe('findByStateName', () => {
    it('should return a state by name', async () => {
      const stateName = 'MG';
      const mockState = { stateName: 'MG', numberOfPersons: 2 };

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockState),
      });

      const result = await repository.findByStateName(stateName);
      expect(model.findOne).toHaveBeenCalledWith({ stateName });
      expect(result).toEqual(mockState);
    });
  });

  describe('create', () => {
    it('should create a new state', async () => {
      const mockInput = { stateName: 'MG', numberOfPersons: 1 };
      model.create.mockResolvedValue(mockInput);

      const result = await repository.create(mockInput);
      expect(model.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockInput);
    });
  });

  describe('update', () => {
    it('should update a state if it exists', async () => {
      const mockInput = { stateName: 'RJ', numberOfPersons: 3 };
      const mockUpdated = { ...mockInput };

      model.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUpdated),
      });

      const result = await repository.update(mockInput);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { stateName: 'RJ' },
        { $set: { numberOfPersons: 3 } },
        { new: true, upsert: true },
      );
      expect(result).toEqual(mockUpdated);
    });
  });
});
