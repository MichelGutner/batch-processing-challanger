import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { CsvReader } from '../services/interfaces';
import { Versioning } from '@shared/types/version';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('/ingestion')
export class IngestionController {
  constructor(
    @Inject('CsvReader')
    private readonly csvReader: CsvReader,
  ) {}

  @Version(Versioning.V1)
  @Post('process')
  @UseInterceptors(
    FileInterceptor('file_asset', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async processCsv(@UploadedFile() file: Express.Multer.File) {
    await this.csvReader.execute(file.path);
    return { message: 'CSV processed successfully' };
  }
}
