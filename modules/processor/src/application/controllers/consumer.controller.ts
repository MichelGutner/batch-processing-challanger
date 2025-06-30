import { Person } from '@common/src/domain';
import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Consumer } from '../services/interfaces/consumer.interface';

@Controller('consumer')
export class ConsumerController {
  private readonly logger = new Logger(ConsumerController.name);

  constructor(
    @Inject('Consumer')
    private readonly consumerService: Consumer, // ConsumerService
  ) {}

  @MessagePattern('Csv_Process')
  async receiveFromQueue(@Payload() payload: string): Promise<void> {
    try {
      const data: Person[] = JSON.parse(payload);
      this.consumerService.execute(data);
    } catch (error) {
      this.logger.error('Failed to process payload', error);
      throw new Error('Invalid payload format');
    }
  }
}
