import { StateRepository } from '@modules/states/domain/repository';
import { Inject, Injectable } from '@nestjs/common';
import { StateInputDto } from '../dtos/state.dto';
import { StateService } from './interfaces';
import { Person } from '@common/src/domain';

@Injectable()
export class StateServiceImpl implements StateService {
  constructor(
    @Inject('StateRepository')
    private stateRepository: StateRepository,
  ) {}

  async execute(input: Person[]) {
    try {
      if (!Array.isArray(input) || input.length === 0) {
        throw new Error(
          'Invalid input: Expected a non-empty array of Person objects',
        );
      }
    } catch (error) {
      throw new Error(`Error processing state: ${error.message}`);
    }

    for (const person of input) {
      try {
        await this.processPerson(person);
      } catch (error) {
        throw new Error(
          `Error processing person ${person.name}: ${error.message}`,
        );
      }
    }
    
    return {
      message: `State processed successfully ${input.length}`,
      status: 'success',
    };
  }
  private async processPerson(person: Person) {
    const state = await this.stateRepository.findByStateName(person.state);
    if (state) {
      state.numberOfPersons += 1;
      await this.stateRepository.update(state);
    } else {
      await this.stateRepository.create({
        stateName: person.state,
        numberOfPersons: 1,
      });
    }
  }
}
