import { Person } from '@modules/ingestion/domain';

export type Batcher = {
  execute: (data: Person[], size: number) => Promise<void>;
};
