import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrowsePaginatedFEQuery } from '../commons/dto/db-paginated-query.dto';
import { QueryUtils } from '../commons/helpers/query.utils';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly queryUtils: QueryUtils,
    private readonly employeesService: EmployeesService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Please check validation rules.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateEmployeeDto,
    description: 'Json structure for employee object',
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Paginated results successfully provided',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async findAll(@Query() query: BrowsePaginatedFEQuery) {
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

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Employee requested by id successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({
    name: 'id',
    description: 'Id of the object which should be requested',
  })
  findOne(@Param('id') _id: string) {
    return this.employeesService.findOne(_id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Employee update by id requested successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({
    name: 'id',
    description: 'Id of the object which should be updated',
  })
  @ApiBody({
    type: UpdateEmployeeDto,
    description: 'Json structure for employee object',
  })
  update(
    @Param('id') _id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(_id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Id of the object which should be deleted',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee removal by id requested successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') _id: string) {
    return this.employeesService.remove(_id);
  }
}
