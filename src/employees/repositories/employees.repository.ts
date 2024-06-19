import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../models/employee.schema';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { DbPaginatedQuery } from '../../commons/dto/db-paginated-query.dto';
import { EventPublisher, IEvent } from '@nestjs/cqrs';
import { EmployeeAggregate } from '../models/employee.aggregate';
import { EmployeeCreatedSuccessEvent } from '../events/employee-created-success.event';

@Injectable()
export class EmployeesRepository {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    private readonly publisher: EventPublisher,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto, source) {
    try {
      const createdEmployee = new this.employeeModel(createEmployeeDto);
      await createdEmployee.save();
      this.publishEvent(createdEmployee, new EmployeeCreatedSuccessEvent(createEmployeeDto._id, createEmployeeDto, source));
    } catch (error) {
      // Due to YAGNI principle we most probably don't want to create failure event if data are not saved to the db.
      // this.publishEvent(data, new EmployeeCreatedFailureEvent(data._id, data, error, reason));

      this.logger.verbose('Employee creation failed');
      throw error;
    }
  }

  async findAll(query: DbPaginatedQuery) {
    try {
      const skip = query.offset || 0;
      const aggregation = [];
      if (query.where) {
        aggregation.push({
          $match: query.where,
        });
      }
      if (skip) {
        aggregation.push({
          $skip: skip,
        });
      }
      if (query.limit) {
        aggregation.push({
          $limit: query.limit,
        });
      }
      const result = await this.employeeModel.aggregate(aggregation);
      return result;
    } catch (error) {
      this.logger.verbose(error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.employeeModel.findOne({ _id: id }).exec();
      return result;
    } catch (error) {
      this.logger.verbose(error);
      throw error;
    }
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeModel.updateOne(
      { _id: id },
      { $set: updateEmployeeDto }
    ).exec();
  }

  delete(id: string) {
    return this.employeeModel.deleteOne({ _id: id }).exec();
  }

  count() {
    return this.employeeModel.countDocuments();
  }

  private publishEvent(data: any, event: IEvent) {
    const employeeAggregate = this.publisher.mergeObjectContext(
      new EmployeeAggregate(data),
    );
    employeeAggregate.apply(event);
    employeeAggregate.commit();
  }
}
