import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatesDocument = State & Document;

@Schema({ timestamps: true })
export class State {
  @Prop({ required: true })
  stateName: string;

  @Prop({ required: false, default: 0 })
  numberOfPersons: number;
}

export const StatesSchema = SchemaFactory.createForClass(State);