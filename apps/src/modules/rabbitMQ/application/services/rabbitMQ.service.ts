import { Injectable } from '@nestjs/common';
import { RabbitMQ } from '../interfaces/rabbtiMQ.interface';
import { Person } from '@modules/ingestion/domain';

@Injectable()
export class RabbitMQService implements RabbitMQ {
  async publish(data: Person[]): Promise<void> {
    // Here you would typically connect to RabbitMQ and publish the data.
    // For demonstration purposes, we will just log the data.
    console.log('Publishing data to RabbitMQ:', data.length, 'records');
    
    // Example of how you might use amqp-connection-manager to publish messages
    // const connection = amqp.connect(['amqp://localhost']);
    // const channelWrapper = connection.createChannel({
    //   json: true,
    //   setup: (channel) => {
    //     return channel.assertQueue('my-queue', { durable: true });
    //   },
    // });
    
    // await channelWrapper.sendToQueue('my-queue', data);
  }
}
