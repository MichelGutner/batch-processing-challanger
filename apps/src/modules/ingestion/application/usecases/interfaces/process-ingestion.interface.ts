import { ProcessInputDto } from '../../dtos/process.dto';

export type ProcessIngestion = {
  execute: (filePath: string, query: ProcessInputDto) => Promise<void>;
};
