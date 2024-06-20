import { Injectable, Logger } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Employee } from './models/employee.schema';
import { BrowseEmployeesQuery } from './queries/impl/browse-employees.query';
import { ReadEmployeesQuery } from './queries/impl/read-employees.query';
import { EditEmployeeCommand } from './commands/impl/edit-employee.command';
import { DeleteEmployeeCommand } from './commands/impl/delete-employee.command';
import { CreateEmployeeCommand } from './commands/impl/create-employee.command';
import { BrowsePaginatedFEQuery, DbPaginatedQuery } from 'src/commons/dto/db-paginated-query.dto';
import { CountEmployeesQuery } from './queries/impl/count-employees.query';
import { QueryUtils } from '../commons/helpers/query.utils';

@Injectable()
export class EmployeesService {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private readonly queryUtils: QueryUtils,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto): Promise<void> {
    return this.executeCommand(new CreateEmployeeCommand(createEmployeeDto));
  }

  async findAll(query: BrowsePaginatedFEQuery): Promise<any> {
    const args = {
      ...this.queryUtils.getQueryParams(query),
    };

    const condition = {
      $or: [
        { _id: query.q ? query.q : '' },
        { email: { $regex: query.q ? query.q : '', $options: 'i' } },
        { firstName: { $regex: query.q ? query.q : '', $options: 'i' } },
        { lastName: { $regex: query.q ? query.q : '', $options: 'i' } },
        { jobTitle: { $regex: query.q ? query.q : '', $options: 'i' } },
        { department: { $regex: query.q ? query.q : '', $options: 'i' } },
      ],
    };

    const data: Array<Employee> = await this.executeQuery(
      new BrowseEmployeesQuery({
        where: condition, // Search string
        offset: args.offset, // based on page
        limit: args.limit, // max amount of docs to return
      }),
    );

    const totalCount = await this.countTotal();

    const result = {
      totalRecords: totalCount,
      totalPages: Math.ceil(totalCount / args.limit),
      page: args.page,
      limit: args.limit,
      data: [...data],
    };

    return result;
  }

  async findOne(_id: string): Promise<Employee> {
    const result: Employee = await this.executeQuery(
      new ReadEmployeesQuery(_id),
    );
    return result;
  }

  update(_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<void> {
    return this.executeCommand(new EditEmployeeCommand(_id, updateEmployeeDto));
  }

  remove(_id: string): Promise<void> {
    return this.executeCommand(new DeleteEmployeeCommand(_id));
  }

  async countTotal(): Promise<number> {
    const result: number = await this.executeQuery(new CountEmployeesQuery());
    return result;
  }

  // common logic can be isolated to the BreadService
  protected async executeCommand(command: ICommand): Promise<void> {
    if (this.commandBus instanceof CommandBus) {
      this.logger.log(`${command.constructor.name} executed`);
      return this.commandBus.execute(command);
    }
    this.logger.error(
      `Could not execute command of type ${command.constructor.name} on the command bus of wrong type
      `,
    );
  }

  protected async executeQuery(query: IQuery): Promise<any> {
    if (this.queryBus instanceof QueryBus) {
      this.logger.log(`${query.constructor.name} executed`);
      return this.queryBus.execute(query);
    }
    this.logger.error(
      `Could not execute query of type ${query.constructor.name} on the query bus of wrong type
      `,
    );
  }
}
