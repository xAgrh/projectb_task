import { AggregateRoot } from '@nestjs/cqrs';
import { Employee } from './employee.schema';

export class EmployeeAggregate extends AggregateRoot {
  _id: string;

  firstName: string;

  lastName: string;

  jobTitle: string;

  department: string;

  email: string;

  constructor(data?: Partial<Employee>) {
    super();
  }

}