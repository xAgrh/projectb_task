import { IQuery } from '@nestjs/cqrs';

export class ReadEmployeesQuery implements IQuery {
  constructor(public readonly id: string) {}
}
