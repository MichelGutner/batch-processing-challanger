import { State } from "@modules/states/infrastructure/mongoose/states.schema";

export abstract class StateRepository {
    abstract create(state: State): Promise<State>;
    abstract update(state: State): Promise<State>;
    abstract findByStateName(stateName: string): Promise<State | null>;
  }
  