import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateEmployeeCommand } from '../impl/create-employee.command';
import { nanoid } from 'nanoid';
import { EmployeesRepository } from '../../../employees/repositories/employees.repository';

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeCommandHandler implements ICommandHandler<CreateEmployeeCommand> {

  constructor(private repository: EmployeesRepository) {}

  async execute(command: CreateEmployeeCommand) {
    const { employee } = command;

    const _id = nanoid();

    employee._id = employee._id ? employee._id : _id;

    // We can define from which source entity was created
    const source = 'REST'

    this.repository.create(employee, source);

    // Due to YAGNI principle we most probably don't want to create event before data will be saved to the db.
    // const { employee } = command;

    // const _id = nanoid();

    // const employeeAggregate = this.publisher.mergeObjectContext(
    //   new EmployeeAggregate(employee),
    // );

    // const event = new EmployeeCreationRequestedEvent(
    //   _id,
    //   employee,
    // );
    // employeeAggregate.apply(
    //   event,
    // );

    // employeeAggregate.commit();
  }
}
