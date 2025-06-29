import { Person } from '@common/src/domain';

export type Batcher = {
  execute: (data: Person[], size: number) => Promise<void>;
};
