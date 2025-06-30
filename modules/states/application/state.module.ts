import { Global, Module } from '@nestjs/common';
import { StateServiceImpl } from './services/state.service';
import { StateRepository } from '../domain/repository';
import { MongooseStateRepository } from '../infrastructure/mongoose/states.repository.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { State, StatesSchema } from '../infrastructure/mongoose/states.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: State.name, schema: StatesSchema }]),
  ],
  providers: [
    StateServiceImpl,
    {
      provide: 'StateRepository',
      useClass: MongooseStateRepository,
    },
    {
      provide: 'StatesService',
      useClass: StateServiceImpl,
    },
  ],
  exports: [
    { provide: 'StatesService', useClass: StateServiceImpl },
    {
      provide: 'StateRepository',
      useClass: MongooseStateRepository,
    },
  ],
})
export class StateModule {}
