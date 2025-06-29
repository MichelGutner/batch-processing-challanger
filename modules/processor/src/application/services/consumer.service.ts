import { Person } from '@modules/ingestion/src/domain';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
// import { P } from 'pino';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(private readonly httpService: HttpService) {}
  async executeLongRunningTask(data: Person): Promise<void> {
    this.logger.log('Execute long running task >> ', JSON.stringify(data));
    this.logger.debug(data);

    this.logger.log('process complete');

    await this.httpService.axiosRef.post(
      `${'localhost://3001'}/ingestion/process-complete`,
      data,
    );
  }
}
