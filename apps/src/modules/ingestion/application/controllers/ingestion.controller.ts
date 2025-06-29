import {
  Controller,
  Inject,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { Versioning } from '@shared/types/version';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProcessInputDto } from '../dtos/process.dto';
import { ProcessIngestion } from '../usecases/interfaces';

@Controller('/ingestion')
export class IngestionController {
  constructor(
    @Inject('ProcessIngestionUseCase')
    private readonly process: ProcessIngestion,
  ) {}

  @Version(Versioning.V1)
  @Post('process')
  @UseInterceptors(FileInterceptor('file', { dest: './files' }))
  async processCsv(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: ProcessInputDto,
  ) {
    const { batchSize = 1000, delimiter = ',' } = query;
    await this.process.execute(file.path, {
      batchSize,
      delimiter,
    });
    return { message: 'CSV processed successfully' };
  }
}
