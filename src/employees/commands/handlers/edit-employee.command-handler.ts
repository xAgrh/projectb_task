import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmployeesRepository } from '../../../employees/repositories/employees.repository';
import { EditEmployeeCommand } from '../impl/edit-employee.command';

@CommandHandler(EditEmployeeCommand)
export class EditEmployeeCommandHandler
  implements ICommandHandler<EditEmployeeCommand>
{
  constructor(private repository: EmployeesRepository) {}

  async execute(command: EditEmployeeCommand) {
    const { _id, employee } = command;

    this.repository.update(_id, employee);
  }
}
