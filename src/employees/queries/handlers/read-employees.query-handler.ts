import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ReadEmployeesQuery } from '../impl/read-employees.query';
import { EmployeesRepository } from '../../../employees/repositories/employees.repository';
import { Employee, EmployeeDocument } from '../../models/employee.schema';

@QueryHandler(ReadEmployeesQuery)
export class ReadEmployeesQueryHandler implements IQueryHandler<ReadEmployeesQuery> {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private repository: EmployeesRepository) {}

  async execute(query: ReadEmployeesQuery): Promise<EmployeeDocument> {
    const { id } = query;
    try {
      return this.repository.findOne(id);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
