import { Person } from '@common/src/domain';

export type Processor = {
  execute: (data: Person[]) => Promise<void>;
};
