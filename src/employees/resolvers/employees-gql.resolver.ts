import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  BrowsePaginatedFEOutputSubGraph,
  BrowsePaginatedFEQuerySubGraph,
  CreateEmployeeDtoSubGraph,
  EmployeeSubGraph,
  JustIdOfEmployeeSubGraph,
  UpdateEmployeeDtoSubGraph,
} from '../models/employee.entity';
import { EmployeesService } from '../employees.service';
import { Employee } from '../models/employee.schema';
import { QueryUtils } from '../../commons/helpers/query.utils';

@Resolver()
export class EmployeesResolver {
  constructor(
    private readonly queryUtils: QueryUtils,
    private readonly employeesService: EmployeesService,
  ) {}

  @Query(() => BrowsePaginatedFEOutputSubGraph, { name: 'getEmployees' })
  async getEmployees(
    @Args('browseEmployeesInput') query: BrowsePaginatedFEQuerySubGraph,
  ) {
    // TODO: Logic should be moved to the service.
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

    const data = await this.employeesService.findAll({
      where: condition, // Search string
      offset: args.offset, // based on page
      limit: args.limit, // max amount of docs to return
    });

    const totalCount = await this.employeesService.countTotal();

    const result = {
      totalRecords: totalCount,
      totalPages: Math.ceil(totalCount / args.limit),
      page: args.page,
      limit: args.limit,
      data: [...data],
    };

    return result;
  }

  @Query(() => EmployeeSubGraph, { name: 'getEmployee' })
  async findOneById(
    @Args('id')
    id: string,
  ): Promise<Employee> {
    return this.employeesService.findOne(id);
  }

  @Mutation(() => EmployeeSubGraph, { name: 'createEmployee' })
  async create(
    @Args('createEmployeeInput') args: CreateEmployeeDtoSubGraph,
  ): Promise<Employee> {
    await this.employeesService.create(args);
    // TODO:
    // Should be fired after db
    // pubSub.publish('employeeCreated', { employeeCreated: createdEmployee });
    return { ...args };
  }

  @Mutation(() => EmployeeSubGraph, { name: 'updateEmployee' })
  async update(
    @Args('updateEmployeeId') id: string,
    @Args('updateEmployeeInput') args: UpdateEmployeeDtoSubGraph,
  ): Promise<Employee> {
    await this.employeesService.update(id, args);

    const updatedEmployee = { _id: id, ...args };
    // TODO:
    // Should be fired after db
    // pubSub.publish('employeeUpdated', { employeeUpdated: updatedEmployee });
    return updatedEmployee;
  }

  @Mutation(() => JustIdOfEmployeeSubGraph, { name: 'deleteEmployee' })
  async delete(@Args('deleteEmployeeId') id: string): Promise<unknown> {
    await this.employeesService.remove(id);

    const deletedEmployee = { _id: id };
    // TODO:
    // Should be fired after db
    // pubSub.publish('employeeDeleted', { employeeDeleted: deletedEmployee });
    return deletedEmployee;
  }

  // @Subscription('employeeCreated')
  // employeeCreated() {
  //   return pubSub.asyncIterator('employeeCreated');
  // }

  // @Subscription('employeeCreated')
  // employeeUpdated() {
  //   return pubSub.asyncIterator('employeeUpdated');
  // }

  // @Subscription('employeeDeleted')
  // employeeDeleted() {
  //   return pubSub.asyncIterator('employeeDeleted');
  // }
}
