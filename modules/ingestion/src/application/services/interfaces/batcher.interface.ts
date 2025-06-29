import { Person } from '@modules/ingestion/src/domain';

export type Batcher = {
  execute: (data: Person[], size: number) => Promise<void>;
};
