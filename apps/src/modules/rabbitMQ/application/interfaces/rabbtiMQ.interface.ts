import { Person } from '@modules/ingestion/domain';

export type RabbitMQ = {
  publish: (data: Person[]) => Promise<void>;
};
