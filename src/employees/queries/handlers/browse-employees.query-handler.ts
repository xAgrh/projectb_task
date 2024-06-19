import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BrowseEmployeesQuery } from '../impl/browse-employees.query';
import { Logger } from '@nestjs/common';
import { Employee } from '../../models/employee.schema';
import { EmployeesRepository } from '../../../employees/repositories/employees.repository';

@QueryHandler(BrowseEmployeesQuery)
export class BrowseEmployeesQueryHandler implements IQueryHandler<BrowseEmployeesQuery> {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private repository: EmployeesRepository) {}

  async execute(data: BrowseEmployeesQuery): Promise<Employee[]> {
    this.logger.log('QUERY TRIGGERED: FindAllEmployeesQueryHandler...');
    const { query } = data;
    try {
      return await this.repository.findAll(query);
    } catch (error) {
      this.logger.error(`Failed to find all Employees ${query}`);
      this.logger.log(error.message);
      this.logger.debug(error.stack);
      throw error;
    }
  }
}
