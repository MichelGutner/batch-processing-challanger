import { State } from '@modules/states/infrastructure/mongoose/states.schema';

export type StateRepository = {
  create: (state: State) => Promise<State>;
  update: (state: State) => Promise<State>;
  findByStateName: (stateName: string) => Promise<State | null>;
};
