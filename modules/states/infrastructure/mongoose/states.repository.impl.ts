import { StateRepository } from '@modules/states/domain/repository';
import { Injectable } from '@nestjs/common';
import { State, StatesDocument } from './states.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongooseStateRepository implements StateRepository {
  constructor(@InjectModel(State.name) private model: Model<StatesDocument>) {}

  async update(state: Partial<State>) {
    const updatedState = await this.model
      .findOneAndUpdate(
        { stateName: state.stateName },
        { $set: { numberOfPersons: state.numberOfPersons } },
        { new: true, upsert: true },
      )
      .exec();
    return updatedState;
  }

  async create(state: State): Promise<State> {
    return await this.model.create(state);
  }

  async findByStateName(stateName: string): Promise<State | null> {
    return await this.model.findOne({ stateName }).exec();
  }
}
