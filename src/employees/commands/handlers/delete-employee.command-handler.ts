import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmployeesRepository } from '../../../employees/repositories/employees.repository';
import { DeleteEmployeeCommand } from '../impl/delete-employee.command';

@CommandHandler(DeleteEmployeeCommand)
export class DeleteEmployeeCommandHandler implements ICommandHandler<DeleteEmployeeCommand> {

  constructor(private repository: EmployeesRepository) {}

  async execute(command: DeleteEmployeeCommand) {

    const { _id } = command;

    this.repository.delete(_id);
  }
}
