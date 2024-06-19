import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './models/employee.schema';
import { EmployeesRepository } from './repositories/employees.repository';
import { EmployeesCommandHandlers } from './commands/handlers';
import { EmployeesQueryHandlers } from './queries/handlers';
import { EmployeesEventHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { UtilsModule } from '../commons/helpers/utils.module';
import { EmailsModule } from '../emails-handling/email.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    CqrsModule,
    UtilsModule,
  ],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    EmployeesRepository,
    ...EmployeesCommandHandlers,
    ...EmployeesQueryHandlers,
    ...EmployeesEventHandlers,
  ],
})
export class EmployeesModule {}
