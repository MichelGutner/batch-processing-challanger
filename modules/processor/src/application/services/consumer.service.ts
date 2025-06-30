import { Person } from '@common/src/domain';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Consumer } from './interfaces/consumer.interface';
import { StateService } from '@modules/states/application/services/interfaces';

@Injectable()
export class ConsumerService implements Consumer {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(
    @Inject('StatesService')
    private readonly stateService: StateService,
  ) {}

  async execute(data: Person[]): Promise<void> {
    await this.stateService.execute(data);
  }
}
