import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop()
  _id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  jobTitle: string;

  @Prop()
  department: string;

  @Prop()
  email: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);