import { Person } from '@common/src/domain';

export type Consumer = {
  execute: (data: Person[]) => Promise<void>;
};
