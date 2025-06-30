import { Person } from '@common/src/domain';

export type StateService = {
  execute: (input: Person[]) => Promise<{ message: string; status: string }>;
};
