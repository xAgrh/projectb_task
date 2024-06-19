import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { EmployeesRepository } from '../../repositories/employees.repository';
import { CountEmployeesQuery } from '../impl/count-employees.query';

@QueryHandler(CountEmployeesQuery)
export class CountEmployeesQueryHandler
  implements IQueryHandler<CountEmployeesQuery>
{
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private repository: EmployeesRepository) {}

  async execute(): Promise<number> {
    try {
      return this.repository.count();
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
