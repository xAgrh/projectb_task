import { ICommand } from '@nestjs/cqrs';
import { UpdateEmployeeDto } from 'src/employees/dto/update-employee.dto';

export class EditEmployeeCommand implements ICommand {
  constructor(
    public readonly _id: string,
    public readonly employee: UpdateEmployeeDto,
  ) {}
}
