import { Person } from '@common/src/domain';
import { Inject, Injectable } from '@nestjs/common';
import { Processor } from './interfaces/processor.interface';
import { StateService } from '@modules/states/application/services/interfaces';
import { Logger } from '@modules/logger/application';

@Injectable()
export class ProcessorService implements Processor {
  constructor(
    @Inject('StatesService')
    private readonly stateService: StateService,
    @Inject('Logger')
    private readonly logger: Logger,
  ) {}

  async execute(data: Person[]): Promise<void> {
    this.logger.info(`Processing ${data.length} records`);
    await this.stateService.execute(data);
  }
}
