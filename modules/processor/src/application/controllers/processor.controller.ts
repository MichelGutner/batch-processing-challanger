import { Person } from '@common/src/domain';
import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Processor } from '../services/interfaces/processor.interface';
import { Logger } from '@modules/logger/application';

@Controller('processor')
export class ProcessorController {
  constructor(
    @Inject('Processor')
    private readonly processorService: Processor,
    @Inject('Logger')
    private readonly logger: Logger,
  ) {}

  @MessagePattern('Csv_Process')
  async receiveFromQueue(@Payload() payload: Person[]): Promise<void> {
    try {
      await this.processorService.execute(payload);
    } catch (error) {
      this.logger.error('Failed to process payload', error);
      throw new Error('Invalid payload format');
    }
  }
}
